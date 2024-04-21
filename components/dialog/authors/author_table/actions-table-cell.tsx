import { deleteAuthorClient } from "@/app/_api/services/authorService";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import DeleteDialog from "../../alert-dialog/delete-dialog";
import { eventEmitter } from "../create-author";
import EditAuthorDialog from "../edit-author";
import { AuthorTableModel } from "./columns";

interface ActionsTableCellProps {
  author: AuthorTableModel;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({ author }) => {
  const [editAuthorDialog, setEditAuthorDialog] = useState<boolean>(false);
  const [deleteAuthorDialog, setDeleteAuthorDialog] = useState<boolean>(false);

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
          <DropdownMenuItem onClick={() => setEditAuthorDialog(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteAuthorDialog(true)}>
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT AUTHOR DIALOG */}
      <EditAuthorDialog
        isOpen={editAuthorDialog}
        setIsOpen={setEditAuthorDialog}
        author={author}
      />

      {/* DELETE AUTHOR DIALOG */}
      <DeleteDialog
        isOpen={deleteAuthorDialog}
        setIsOpen={setDeleteAuthorDialog}
        dialogTitle="Bu yazarı silersen bu işlemi geri alamazsın!"
        dialogDescription={`${author.author_name} ${author.author_surname} yazarını kalıcı olarak silmek istediğine emin misin?`}
        eventEmitter={eventEmitter}
        emitterFnc="updateGrid"
        onDelete={() => deleteAuthorClient(author.author_id)}
      />
    </>
  );
};

export default ActionsTableCell;
