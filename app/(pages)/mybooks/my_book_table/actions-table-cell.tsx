import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import DeleteMyBookDialog from "../delete-dialog/delete-dialog";
import EditMyBookDialog from "../edit-dialog/edit-dialog";
import { MyBookTableModel } from "./columns";

interface ActionsTableCellProps {
  myBook: MyBookTableModel;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({ myBook }) => {
  const [removeBookDialog, setRemoveBookDialog] = useState(false);
  const [openReadingDialog, setOpenReadingDialog] = useState(false);
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
          <DropdownMenuItem onClick={() => setOpenReadingDialog(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setRemoveBookDialog(true)}>
            Kitaplığımdan Kaldır
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Edit reading dialog */}
      {openReadingDialog && (
        <EditMyBookDialog
          isOpen={openReadingDialog}
          setIsOpen={setOpenReadingDialog}
          book={myBook}
        />
      )}

      {/* delete book dialog */}
      {removeBookDialog && (
        <DeleteMyBookDialog
          isOpen={removeBookDialog}
          setIsOpen={setRemoveBookDialog}
          book={myBook}
        />
      )}
    </>
  );
};

export default ActionsTableCell;
