import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { BookTableModel } from "./columns";
import { Button } from "@/components/ui/button";
import { TbDots } from "react-icons/tb";
import AddMyLibraryDialog from "../add-my-library-dialog/add-my-library-dialog";
import DeleteGeneralBookDialog from "../delete-dialog/delete-dialog";
import { useState } from "react";
import { Row } from "@tanstack/react-table";

interface ActionsTableCellProps{
    selectedBook: BookTableModel;
}

const ActionsTableCell:React.FC<ActionsTableCellProps> = ({selectedBook}) => {

    const [addMyLibrary, setAddMyLibrary] = useState(false);
    const [deleteBookDialog, setDeleteBookDialog] = useState<boolean>(false);
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
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(selectedBook.book_title)
                }
              >
                Bilgi
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setAddMyLibrary(true)}>
                Kitaplığıma Ekle
              </DropdownMenuItem>
              <DropdownMenuItem>Düzenle</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteBookDialog(true)}>
                Sil
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* add my library dialog */}
          {addMyLibrary && (
            <AddMyLibraryDialog
              isOpen={addMyLibrary}
              setIsOpen={setAddMyLibrary}
              book={selectedBook}
            />
          )}

          {/* delete book dialog */}
          {deleteBookDialog && (
            <DeleteGeneralBookDialog
              isOpen={deleteBookDialog}
              setIsOpen={setDeleteBookDialog}
              book={selectedBook}
            />
          )}
        </>
      );
}
 
export default ActionsTableCell;