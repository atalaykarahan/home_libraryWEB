import DeleteCaller from "@/api-caller/delete-caller";
import { AuthorTableModel } from "../author_table/columns";
import { eventEmitter } from "../create-author";
import { deleteAuthorClient } from "@/app/_api/services/authorService";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteAuthorDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  author: AuthorTableModel;
}

const DeleteAuthorDialog: React.FC<DeleteAuthorDialogProps> = ({
  isOpen,
  setIsOpen,
  author,
}) => {
  //#region DELETE AUTHOR
  const handleDeleteAuthor = async () => {
    DeleteCaller({
      apiCall: deleteAuthorClient(author.author_id),
      eventEmitter: eventEmitter,
      emitterFnc: "updateGrid",
    });
  };
  //#endregion

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {author.author_name} {author.author_surname} yazarını kalıcı olarak
            silmek istediğine emin misin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bu yazarı silersen bu işlemi geri alamzsın!
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={() => handleDeleteAuthor()}>
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAuthorDialog;
