import { deleteCategoryClient } from "@/app/_api/services/categoryService";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { TbDots } from "react-icons/tb";
import DeleteDialog from "../../alert-dialog/delete-dialog";
import { eventEmitter } from "../create-category";
import EditCategoryDialog from "../edit-category";
import { CategoryTableModel } from "./columns";

interface ActionsTableCellProps {
  category: CategoryTableModel;
}

const ActionsTableCell: React.FC<ActionsTableCellProps> = ({ category }) => {
  const [editCategoryDialog, setEditCategoryDialog] = useState<boolean>(false);
  const [deleteCategoryDialog, setDeleteCategoryDialog] =
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
          <DropdownMenuItem onClick={() => setEditCategoryDialog(true)}>
            Düzenle
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setDeleteCategoryDialog(true)}>
            Sil
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* EDIT CATEGORY DIALOG */}
      <EditCategoryDialog
        isOpen={editCategoryDialog}
        setIsOpen={setEditCategoryDialog}
        category={category}
      />

      {/* DELETE CATEGORY DIALOG */}
      <DeleteDialog
        isOpen={deleteCategoryDialog}
        setIsOpen={setDeleteCategoryDialog}
        dialogTitle="Bu kategoriyi silersen bu işlemi geri alamazsın!"
        eventEmitter={eventEmitter}
        emitterFnc="updateGrid"
        dialogDescription={`${category.category_name} kategorisini kalıcı olarak silmek istediğine emin misin?`}
        onDelete={() => deleteCategoryClient(category.category_id)}
      />
    </>
  );
};

export default ActionsTableCell;
