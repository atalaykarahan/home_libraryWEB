"use client";
import { getUserBookGridCollapseList } from "@/app/_api/services/bookService";
import { useEffect, useState } from "react";
import { UserCollapsibleModel, columns } from "./columns";
import { DataTable } from "./data-table";
import { useDispatch } from "react-redux";
import { turnOffSkeleton } from "@/redux/slices/grid-slice";

interface CollapsibleTablePageProps {
  user_id: string;
}

const CollapsibleTablePage: React.FC<CollapsibleTablePageProps> = ({
  user_id,
}) => {
  const [userDetail, setUserDetail] = useState<UserCollapsibleModel[]>([]);
const dispatch = useDispatch()
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await getUserBookGridCollapseList(user_id);

      if (res.status !== 200) {
        throw new Error("User collapse ile ilgili bir hata oluştu");
      }
      setUserDetail(res.data);
      dispatch(turnOffSkeleton("userCollapse"))
    } catch (error) {
      console.warn("user collapse try&catch hata -> ", error);
    }
  };

  return <DataTable height={"25rem"} columns={columns} data={userDetail} />;
};

export default CollapsibleTablePage;
