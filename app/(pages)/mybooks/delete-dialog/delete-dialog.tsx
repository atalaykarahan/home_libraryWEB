import { removeMyBook } from "@/app/_api/services/readingService";
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
import EventEmitter from "events";
import { toast } from "sonner";
import { MyBookTableModel } from "../my_book_table/columns";

export const deleteMyBookEmitter = new EventEmitter();

interface DeleteMyBookDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  book: MyBookTableModel;
}

const DeleteMyBookDialog: React.FC<DeleteMyBookDialogProps> = ({
  isOpen,
  setIsOpen,
  book,
}) => {
  const removeBook = async (reading_id: number) => {
    try {
      const resRemoveBook = await removeMyBook(reading_id);
      if (resRemoveBook.status !== 204) {
        toast.error(`Bir hata meydana geldi`, {
          description: `Daha sonra tekrar deneyin!`,
          position: "top-right",
        });
        throw new Error("Reading silinirken bir hata oluştu");
      } else {
        toast.success(`KALDIRMA BAŞARILI`, {
          description: `${book.book_title}`,
          position: "top-right",
          style: {
            backgroundColor: "hsl(143, 85%, 96%)",
            color: "hsl(140, 100%, 27%)",
            borderColor: "hsl(145, 92%, 91%)",
          },
        });
        deleteMyBookEmitter.emit("updateGrid");
      }
    } catch (error) {
      toast.error(`HATA`, {
        description: `${error}`,
        position: "top-right",
      });
      throw new Error(`removeMyReading try&catch hata -> ${error}`);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {book.book_title} kitabını kitaplığından kaldırmak istediğine emin
            misin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Eğer bu kitap hakkında herhangi bir notun varsa bunlar silinir ve
            bir daha geri getiremezsin! Bu işlem kitabı yalnızca kitaplığından
            kaldıracaktır. Kitabı daha sonra kütüphaneden yeniden
            ekleyebilirsin.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => removeBook(book.reading_id)}
          >
            Kaldır
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteMyBookDialog;
