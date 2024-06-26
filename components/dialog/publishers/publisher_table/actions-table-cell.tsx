import { deletePublisherClient } from "@/app/_api/services/publisherService";
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
import { eventEmitter } from "../create-publisher";
import EditPublisherDialog from "../edit-publisher";
import { PublisherTableModel } from "./columns";

interface ActionsTableCellProps {
  publisher: PublisherTableModel;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({ publisher }) => {
  const [editPublisherDialog, setEditPublisherDialog] =
    useState<boolean>(false);
  const [deletePublisherDialog, setDeletePublisherDialog] =
    useState<boolean>(false);

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
          <DropdownMenuItem onClick={() => setEditPublisherDialog(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeletePublisherDialog(true)}>
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT PUBLISHER DIALOG */}
      <EditPublisherDialog
        isOpen={editPublisherDialog}
        setIsOpen={setEditPublisherDialog}
        publisher={publisher}
      />

      {/* DELETE PUBLISHER DIALOG */}
      <DeleteDialog
        isOpen={deletePublisherDialog}
        setIsOpen={setDeletePublisherDialog}
        dialogTitle="Bu yayınevini silersen bu işlemi geri alamazsın!"
        eventEmitter={eventEmitter}
        emitterFnc="updateGrid"
        dialogDescription={`${publisher.publisher_name} yayınevini kalıcı olarak silmek istediğine emin misin?`}
        onDelete={() => deletePublisherClient(publisher.publisher_id)}
      />
    </>
  );
};

export default ActionsTableCell;
