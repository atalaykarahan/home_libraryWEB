import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import EditUserDialog from "../edit-dialog/edit-dialog";
import { UserTableModel } from "./columns";

interface ActionsTableCellProps {
  user: UserTableModel;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({ user }) => {
  const [openUserDialog, setOpenUserDialog] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <TbDots className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setOpenUserDialog(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem>Sil</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit user dialog */}
      {openUserDialog && (
        <EditUserDialog
          isOpen={openUserDialog}
          setIsOpen={setOpenUserDialog}
          user={user}
        />
      )}
    </>
  );
};

export default ActionsTableCell;
