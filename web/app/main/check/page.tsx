"use client";
import React, { Key, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  User,
  Pagination,
  Switch,
  Tooltip,
  getKeyValue,
  SortDescriptor,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { PlusIcon } from "../../icons/PlusIcon";
import { VerticalDotsIcon } from "../../icons/VerticalDotsIcon";
import { SearchIcon } from "../../icons/SearchIcon";
import { ChevronDownIcon } from "../../icons/ChevronDownIcon";
import { columns, notes, statusOptions } from "./components/data";
import { EditIcon } from "../../icons/EditIcon";
import { DeleteIcon } from "../../icons/DeleteIcon";
import { EyeIcon } from "../../icons/EyeIcon";
import Image from "next/image";
import API from "@/app/utils/api";
import { error, success } from "@/app/utils/message";
import useUserInfo from "@/app/hooks/useUserInfo";

interface noteType {
  noteId: number;
  title: string;
  coverImg: string;
  authorNickname: string;
  authorAvatar: string;
  status: "waiting" | "approved" | "disapproved" | "delete";
  uploadTime: string; //TODO:questioned
}

const statusColorMap = {
  approved: "success",
  disapproved: "danger",
  waiting: "primary",
};

const INITIAL_VISIBLE_COLUMNS = [
  "authorNickname",
  "title",
  "uploadTime",
  "status",
  "actions",
];

export default function App() {
  const userInfo = useUserInfo();
  const [isAdmin, setIsAdmin] = React.useState(false);
  useEffect(() => {
    if (userInfo?.permission === "admin") {
      setIsAdmin(true);
      setIsMultiple(true);
      setTimeout(() => {
        setIsMultiple(false);
      }, 500);
    }
    // console.log(userInfo);
  }, [userInfo]);

  // final selected
  const [arraySelected, setArraySelected] = React.useState([0]);

  // input value
  const [filterValue, setFilterValue] = React.useState("");
  // selected columns
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]) || "all");
  // dropdown colomns
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS) || "all"
  );
  // status selected
  const [statusFilter, setStatusFilter] = React.useState("all");
  // rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "time",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  // select mode, single or multiple
  const [isMultiple, setIsMultiple] = React.useState(false);
  //search by name or title
  const [isSearchName, setIsSearchName] = React.useState(true);

  const [showDetails, setShowDetails] = React.useState(false);
  const [showChangeStatus, setShowChangeStatus] = React.useState(false);

  const {
    isOpen: isDetailsOpen,
    onOpen: onDetailsOpen,
    onOpenChange: onDetailsOpenChange,
  } = useDisclosure();
  const {
    isOpen: isChangeStatusOpen,
    onOpen: onChangeStatusOpen,
    onOpenChange: onChangeStatusOpenChange,
  } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredNotes = [...notes];

    if (hasSearchFilter) {
      filteredNotes = filteredNotes.filter((note) => {
        if (isSearchName)
          return note.authorNickname.toLowerCase().includes(filterValue.toLowerCase())
        else
          return note.title.toLowerCase().includes(filterValue.toLowerCase())
      }
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredNotes = filteredNotes.filter((note) =>
        Array.from(statusFilter).includes(note.status)
      );
    }

    return filteredNotes;
  }, [notes, filterValue, statusFilter,isSearchName]);

  const headerColumns = React.useMemo(() => {
    if (
      visibleColumns.size >= filteredItems.length ||
      `${visibleColumns}` === "all"
    )
      return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.iid)
    );
  }, [visibleColumns]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column as keyof typeof a];
      const second = b[sortDescriptor.column as keyof typeof b];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  interface noteDetailsType {
    noteTitle: string;
    noteContent: string;
    authorNickname: string;
    lastModifyTime: string; //TODO:questioned
    location: string;
    status: "waiting" | "approved" | "disapproved" | "delete";
    resources: Array<{ mediaType: "img" | "video"; url: string }>;
  }

  const [noteDetails, setNoteDetails] = React.useState<noteDetailsType>({
    noteTitle: "noteTitle",
    noteContent: "noteContent",
    authorNickname: "authorNickname",
    lastModifyTime: "lastModifyTime", //TODO:questione
    location: "location",
    status: "waiting",
    resources: [
      {
        mediaType: "img",
        url: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      },
      {
        mediaType: "img",
        url: "https://timelord.cn/Nicholas/img/drawing/3.jpg",
      },
    ],
  });
  const handleViewDetails = (id: number) => {
    // console.log(id);
    try {
      API.CheckServiceApi.getNoteInfo(id)
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              if (res.data.content) setNoteDetails(res.data.content);
              if (res.data.freshToken)
                localStorage.setItem("xcAuthorization", res.data.freshToken);
              success("获取游记详情成功");
            } else {
              error("获取游记详情失败！");
              if (res.data.status === 401) {
                console.log(res.data?.msg);
                if (res.data?.msg === 'Authentication expires.') {
                  error("登录已过期，请重新登录！");
                  if (process.env.NEXT_PUBLIC_TEST !== "test") {
                    localStorage.removeItem("xcuserInfo");
                    localStorage.removeItem("xcAuthorization");
                  }
                  window.location.href = "/login";
                }
              }
            }
          }
        })
        .catch((err: any) => {
          console.log("Get Note Info Error: ", err);
          error("Get Note Info Error: " + err);
        });
    } catch (err: any) {
      console.log("Get Note Info Error: ", err);
      error("Get Note Info Error: " + err);
    }
    setShowDetails(true);
    // axios get details
    onDetailsOpen();
  };

  const [modalHeader, setModalHeader] = React.useState("");
  const [modalContent, setModalContent] = React.useState(false);
  const [modalOkOption, setModalOkOption] = React.useState<{
    action: 'approve' | 'disapprove' | 'delete'; cn: string; en: string;
  }>({ action: 'approve', cn: '通过游记', en: 'Approve Diary' });
  const [disapproveReason, setDisapproveReason] = React.useState("");

  const handleCheckDiary = (action: 'approve' | 'disapprove' | 'delete', cn: string, en: string) => {
    try {
      API.CheckServiceApi.approveNote({
        noteId: arraySelected,
        action: action,
        comment: disapproveReason,
      })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              success(`${cn}成功`);
            } else {
              error(`${cn}失败！`);
              if (res.data.status === 401) {
                console.log(res.data?.msg);
                if (res.data?.msg === 'Authentication expires.') {
                  error("登录已过期，请重新登录！");
                  if (process.env.NEXT_PUBLIC_TEST !== "test") {
                    localStorage.removeItem("xcuserInfo");
                    localStorage.removeItem("xcAuthorization");
                  }
                  window.location.href = "/login";
                }
              }
            }
          }
        })
        .catch((err: any) => {
          console.log(`${en} Error: `, err);
          error(`${en} Error: ` + err);
        });
    } catch (err: any) {
      console.log(`${en} Error: `, err);
      error(`${en} Error: ` + err);
    }
  }

  const handlePass = () => {
    setShowChangeStatus(true);
    setModalHeader("通过游记");
    setModalContent(false);
    setModalOkOption({ action: 'approve', cn: '通过游记', en: 'Approve Diary' });
    setDisapproveReason("");
    onChangeStatusOpen();
  }

  const handleReject = () => {
    setShowChangeStatus(true);
    setModalHeader("不通过游记");
    setModalContent(true);
    setModalOkOption({ action: 'disapprove', cn: '不通过游记', en: 'Disapprove Diary' });
    setDisapproveReason("");
    onChangeStatusOpen();
  }

  const handleDelete = () => {
    setShowChangeStatus(true);
    setModalHeader("删除游记");
    setModalContent(false);
    setModalOkOption({ action: 'delete', cn: '删除游记', en: 'Delete Diary' });
    setDisapproveReason("");
    // axios get details
    onChangeStatusOpen();
  }

  const handlePassDiary = (id: number) => {
    setArraySelected([id]);
    console.log(id);
    handlePass();
  };

  const handleRejectDiary = (id: number) => {
    setArraySelected([id]);
    console.log(id);
    handleReject();
  }

  const handleDeleteDiary = (id: number) => {
    setArraySelected([id]);
    console.log(id);
    handleDelete();
  };

  const handlePassSelected = () => {
    let selectedArray: Array<number> = [];
    if (`${selectedKeys}` == "all") {
      notes.forEach((value) => {
        selectedArray.push(value.noteId);
      });
    } else {
      selectedKeys.forEach((value) => {
        selectedArray.push(value);
      });
    }
    console.log(selectedArray);
    setArraySelected(selectedArray);
    handlePass();
  };

  const handleRejectSelected = () => {
    let selectedArray: Array<number> = [];
    if (`${selectedKeys}` == "all") {
      notes.forEach((value) => {
        selectedArray.push(value.noteId);
      });
    } else {
      selectedKeys.forEach((value) => {
        selectedArray.push(value);
      });
    }
    console.log(selectedArray);
    setArraySelected(selectedArray);
    handleReject();
  };

  const handleDeleteSelected = () => {
    let selectedArray: Array<number> = [];
    if (`${selectedKeys}` == "all") {
      notes.forEach((value) => {
        selectedArray.push(value.noteId);
      });
    } else {
      selectedKeys.forEach((value) => {
        selectedArray.push(value);
      });
    }
    console.log(selectedArray);
    setArraySelected(selectedArray);
    handleDelete();
  };

  const renderCell = React.useCallback((note: noteType, columnKey: Key, isAdmin: boolean) => {
    // console.log(isAdmin);
    const cellValue = note[columnKey as keyof typeof note];

    switch (columnKey) {
      case "authorNickname":
        return (
          <p className="text-bold text-blue-500 text-md capitalize flex items-center gap-2 min-w-[150px]">
            <Image
              width={50}
              height={50}
              alt="avatar"
              src={note.authorAvatar}
              className="w-[50px] h-[50px]"
            ></Image>
            {cellValue}
          </p>
        );
      case "title":
        return (
          <p className="text-bold text-blue-500 text-md capitalize flex items-center gap-2 min-w-[150px]">
            <Image
              width={50}
              height={50}
              alt="avatar"
              src={note.coverImg}
              className="w-[50px] h-[50px]"
            ></Image>
            {cellValue}
          </p>
        );
      case "status":
        return (
          <Chip
            className="capitalize"
            color={
              statusColorMap[note.status as keyof typeof statusColorMap] ===
                "success"
                ? "success"
                : statusColorMap[note.status as keyof typeof statusColorMap] ===
                  "danger"
                  ? "danger"
                  : "primary"
            }
            size="sm"
            variant="flat"
          >
            {cellValue}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip content="游记详情">
              <span
                className="text-lg text-default-400 cursor-pointer active:opacity-50"
                onClick={() => {
                  handleViewDetails(note.noteId);
                }}
              >
                <EyeIcon />
              </span>
            </Tooltip>
            <Tooltip color="success" content="通过游记">
              <span
                className="text-2xl text-success cursor-pointer active:opacity-50"
                onClick={() => handlePassDiary(note.noteId)}
              >
                +
              </span>
            </Tooltip>
            <Tooltip color="danger" content="不通过游记">
              <span
                className="text-2xl text-danger cursor-pointer active:opacity-50"
                onClick={() => handleRejectDiary(note.noteId)}
              >
                -
              </span>
            </Tooltip>
            {isAdmin && (
              <Tooltip color="danger" content="删除游记">
                <span
                  className="text-lg text-danger cursor-pointer active:opacity-50"
                  onClick={() => {
                    handleDeleteDiary(note.noteId);
                  }}
                >
                  <DeleteIcon />
                </span>
              </Tooltip>
            )}
          </div>
        );
      default:
        return cellValue;
    }
  }, [isAdmin]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
      setPage(1);
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end flex-warp w-full overflow-scroll no-scrollbar">
          <div className="flex gap-3">
            <Input
              isClearable
              className="w-full sm:max-w-[500px] min-w-[100px]"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
            <div className="flex gap-2 items-center justify-center mr-2">
              <Switch
                className="text-small w-full"
                isSelected={isSearchName}
                onValueChange={setIsSearchName}
              >
                SearchBy:
              </Switch>
              <span className="text-small">{isSearchName ? "name" : "title"}</span>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex gap-2 items-center justify-center mr-2">
              <Switch
                className="text-small"
                isSelected={isMultiple}
                onValueChange={setIsMultiple}
              >
                Multiple:
              </Switch>
              <span className="text-small">{isMultiple ? "on" : "off"}</span>
            </div>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Status
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={statusFilter}
                selectionMode="multiple"
                onSelectionChange={(keys) => {
                  console.log(keys);
                  setStatusFilter(keys as string);
                }}
              >
                {statusOptions.map((status) => (
                  <DropdownItem key={status.iid} className="capitalize">
                    {status.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
            <Dropdown>
              <DropdownTrigger className="hidden sm:flex">
                <Button
                  endContent={<ChevronDownIcon className="text-small" />}
                  variant="flat"
                >
                  Columns
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                disallowEmptySelection
                aria-label="Table Columns"
                closeOnSelect={false}
                selectedKeys={visibleColumns}
                selectionMode="multiple"
                onSelectionChange={(keys) => {
                  console.log(keys);
                  setVisibleColumns(keys as Set<string>);
                }}
              >
                {columns.map((column) => (
                  <DropdownItem key={column.iid} className="capitalize">
                    {column.name}
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {notes.length} notes
          </span>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    statusFilter,
    visibleColumns,
    onRowsPerPageChange,
    notes.length,
    onSearchChange,
    hasSearchFilter,
    isMultiple,
    isSearchName,
  ]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        {isMultiple ? (
          <div className="w-[30%] flex items-center gap-4">
            <span className=" text-small text-default-400">
              {selectedKeys.size >= filteredItems.length ||
                `${selectedKeys}` == "all"
                ? "All items selected"
                : `${selectedKeys.size} of ${filteredItems.length} selected`}
            </span>
            {(selectedKeys.size > 0 || `${selectedKeys}` == "all") && (
              <div className="relative flex items-center gap-4 rounded-full bg-slate-200 px-3 py-1">
                <Tooltip color="success" content="通过所选">
                  <span
                    className="text-2xl text-success cursor-pointer active:opacity-50"
                    onClick={handlePassSelected}
                  >
                    +
                  </span>
                </Tooltip>
                <Tooltip color="danger" content="不通过所选">
                  <span
                    className="text-2xl text-danger cursor-pointer active:opacity-50"
                    onClick={handleRejectSelected}
                  >
                    -
                  </span>
                </Tooltip>
                {isAdmin && (
                  <Tooltip color="danger" content="删除所选">
                    <span
                      className="text-lg text-danger cursor-pointer active:opacity-50"
                      onClick={handleDeleteSelected}
                    >
                      <DeleteIcon />
                    </span>
                  </Tooltip>
                )}
              </div>
            )}
          </div>
        ) : (
          <div className="w-[30%] text-small text-default-400"></div>
        )}
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [selectedKeys, items.length, page, pages, hasSearchFilter, isMultiple]);

  return (
    <div className="relative w-full h-full px-4">
      <Table
        aria-label="Example table with custom cells, pagination and sorting"
        isHeaderSticky
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        className="max-h-[80vh]"
        selectedKeys={selectedKeys}
        selectionMode={isMultiple ? "multiple" : "none"}
        sortDescriptor={sortDescriptor as SortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={(keys) => {
          console.log(keys);
          setSelectedKeys(keys as Set<never>);
        }}
        onSortChange={(descriptor) => {
          setSortDescriptor(
            descriptor as React.SetStateAction<{
              column: string;
              direction: string;
            }>
          );
        }}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.iid}
              align={column.iid === "actions" ? "center" : "start"}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent={"暂无游记"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.noteId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey, isAdmin)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showDetails && (
        <Modal isOpen={isDetailsOpen} onOpenChange={onDetailsOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  游记详情
                </ModalHeader>
                <ModalBody>
                  <div>noteTitle: {noteDetails.noteTitle}</div>
                  <div>authorNickname: {noteDetails.authorNickname}</div>
                  <div>lastModifyTime: {noteDetails.lastModifyTime}</div>
                  <div>location: {noteDetails.location}</div>
                  <div>noteContent: {noteDetails.noteContent}</div>
                  <div>status: {noteDetails.status}</div>
                  <div className="flex flex-wrap gap-4">
                    {noteDetails.resources.map((resource) => {
                      return (
                        <>
                          {resource.mediaType === "img" && (
                            <Image
                              height={50}
                              width={50}
                              src={resource.url}
                              alt="img"
                            />
                          )}
                          {
                            resource.mediaType === "video" && (
                              <video src={resource.url} className="w-[50px] h-[50px]"></video>
                            )
                          }
                        </>
                      );
                    })}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" variant="light" onPress={onClose}>
                    Close
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}

      {showChangeStatus && (
        <Modal
          isOpen={isChangeStatusOpen}
          onOpenChange={onChangeStatusOpenChange}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {modalHeader}
                </ModalHeader>
                <ModalBody>
                  {modalContent && (
                    <div>
                      <Input isClearable type="textarea" placeholder="请输入不通过原因" onChange={(e) => { setDisapproveReason(e.target.value) }}></Input>
                    </div>
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    取消
                  </Button>
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => {
                      handleCheckDiary(modalOkOption.action, modalOkOption.cn, modalOkOption.en);
                      onClose();
                    }}
                  >
                    确认
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </div>
  );
}
