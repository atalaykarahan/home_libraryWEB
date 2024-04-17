import { Card, CardContent } from "@/components/ui/card";
import UserTablePage from "./user_table/user-table-page";

const UsersInformation = () => {
  return (
    <Card x-chunk="dashboard-04-chunk-2">
      <CardContent>
        <UserTablePage/>
      </CardContent>
    </Card>
  );
};

export default UsersInformation;
