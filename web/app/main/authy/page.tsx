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
  Chip,
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
import { SearchIcon } from "../../icons/SearchIcon";
import { columns, users } from "./components/data";
import { DeleteIcon } from "../../icons/DeleteIcon";
import useUserInfo from "../../hooks/useUserInfo";
import { useRouter } from "next/navigation";
import API from "@/app/utils/api";
import { error, success } from "@/app/utils/message";

interface userType {
  reviewerId: number;
  username: string;
}

export default function App() {
  const router = useRouter();
  const userInfo = useUserInfo();
  const isAdmin = userInfo?.permission === "admin";
  // 防止非管理员通过直接输入路由进入管理页面
  useEffect(() => {
    console.log(isAdmin, userInfo);
    if (userInfo) {
      if (!isAdmin) {
        router.push("/main");
      }
    }
  }, [userInfo]);

  // input value
  const [filterValue, setFilterValue] = React.useState("");
  // final selected
  const [arraySelected, setArraySelected] = React.useState([0]);
  // selected columns
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]) || "all");
  // rows per page
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "username",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  // select mode, single or multiple
  const [isMultiple, setIsMultiple] = React.useState(false);

  const [showDelete, setShowDelete] = React.useState(false);
  const [showAdd, setShowAdd] = React.useState(false);

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onOpenChange: onDeleteOpenChange,
  } = useDisclosure();

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onOpenChange: onAddOpenChange,
  } = useDisclosure();

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.username.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [users, filterValue]);

  const headerColumns = columns;

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

  const [password, setPassword] = React.useState("");
  const [username, setUsername] = React.useState("");

  const handleAddNew = () => {
    setShowAdd(true);
    onAddOpen();
  };

  const handleAdd = () => {
    if (!username || !password) {
      console.log("Username or password is empty.");
      return;
    }

    try {
      API.AuthyServiceApi.registerReviewer({
        username: username,
        password: password,
      })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              if (res.data.freshToken)
                localStorage.setItem("xcAuthorization", res.data.freshToken);
              success("增加审核人员列表成功");
            } else {
              error("增加审核人员列表失败！");
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
          console.log("Add Reviewer Error: ", err);
          error("Add Reviewer Error: " + err);
        });
    } catch (err: any) {
      console.log("Add Reviewer Error: ", err);
      error("Add Reviewer Error: " + err);
    } finally {
      router.refresh();
    }
  };

  const handleDeleteUser = (id: number) => {
    // console.log(id);
    setArraySelected([id]);
    setShowDelete(true);
    onDeleteOpen();
  };

  const handleDeleteSelected = () => {
    let selectedArray: Array<number> = [];
    if (`${selectedKeys}` == "all") {
      users.forEach((value) => {
        selectedArray.push(value.reviewerId);
      });
    } else {
      selectedKeys.forEach((value) => {
        selectedArray.push(value);
      });
    }
    // console.log(selectedArray);
    setArraySelected(selectedArray);
    setShowDelete(true);
    onDeleteOpen();
  };

  const handleDelete = () => {
    try {
      API.AuthyServiceApi.deleteReviewer({ reviewerId: arraySelected })
        .then((res) => {
          if (res.status === 200) {
            if (res.data.status === 200) {
              if (res.data.freshToken)
                localStorage.setItem("xcAuthorization", res.data.freshToken);
              success("删除审核人员列表成功");
            } else {
              error("删除审核人员列表失败！");
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
          console.log("Delete Reviewer Error: ", err);
          error("Delete Reviewer Error: " + err);
        });
    } catch (err: any) {
      console.log("Delete Reviewer Error: ", err);
      error("Delete Reviewer Error: " + err);
    } finally {
      router.refresh();
    }
  };

  const renderCell = React.useCallback((user: userType, columnKey: Key) => {
    const cellValue = user[columnKey as keyof typeof user];

    switch (columnKey) {
      case "username":
        return (
          <p className="text-bold text-blue-500 text-md capitalize">
            {cellValue}
          </p>
        );
      case "actions":
        return (
          <div className="relative flex items-center gap-3">
            <Tooltip color="danger" content="删除审核人员">
              <span
                className="text-lg text-danger cursor-pointer active:opacity-50"
                onClick={() => {
                  handleDeleteUser(user.reviewerId);
                }}
              >
                <DeleteIcon />
              </span>
            </Tooltip>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

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
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by username..."
            startContent={<SearchIcon />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
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
            <Button
              className="bg-foreground text-background"
              endContent={<div>+</div>}
              size="sm"
              onClick={handleAddNew}
            >
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {users.length} users
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
    onRowsPerPageChange,
    users.length,
    onSearchChange,
    hasSearchFilter,
    isMultiple,
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
                <Tooltip color="danger" content="删除所选">
                  <span
                    className="text-lg text-danger cursor-pointer active:opacity-50"
                    onClick={handleDeleteSelected}
                  >
                    <DeleteIcon />
                  </span>
                </Tooltip>
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
        isStriped
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
        <TableBody emptyContent={"暂无审核人员"} items={sortedItems}>
          {(item) => (
            <TableRow key={item.reviewerId}>
              {(columnKey) => (
                <TableCell>{renderCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>

      {showAdd && (
        <Modal isOpen={isAddOpen} onOpenChange={onAddOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  增加审核人员
                </ModalHeader>
                <ModalBody>
                  <form className="flex flex-col gap-4">
                    <Input
                      isRequired
                      label="Username"
                      placeholder="Enter username"
                      type="text"
                      onValueChange={setUsername}
                    />
                    <Input
                      isRequired
                      label="Password"
                      placeholder="Enter password"
                      type="text"
                      onValueChange={setPassword}
                    />
                  </form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    取消
                  </Button>
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => {
                      handleAdd();
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

      {showDelete && (
        <Modal isOpen={isDeleteOpen} onOpenChange={onDeleteOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  删除审核人员
                </ModalHeader>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    取消
                  </Button>
                  <Button
                    color="primary"
                    variant="ghost"
                    onPress={() => {
                      handleDelete();
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
