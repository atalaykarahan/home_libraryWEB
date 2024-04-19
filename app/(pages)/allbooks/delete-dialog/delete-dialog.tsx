import { deleteBookClient } from "@/app/_api/services/bookService";
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
import { BookTableModel } from "../book_table/columns";

export const deleteBookEmitter = new EventEmitter();
interface DeleteGeneralBookDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  book: BookTableModel;
}

const DeleteGeneralBookDialog: React.FC<DeleteGeneralBookDialogProps> = ({
  isOpen,
  setIsOpen,
  book,
}) => {
  const deleteBook = async (book_id: number) => {
    try {
      const res = await deleteBookClient(book_id);
      if (res.status == 204) {
        deleteBookEmitter.emit("updateGrid");
        toast.success(`KİTAP BAŞARIYLA SİLİNDİ`, {
          position: "top-right",
          style: {
            backgroundColor: "hsl(143, 85%, 96%)",
            color: "hsl(140, 100%, 27%)",
            borderColor: "hsl(145, 92%, 91%)",
          },
        });
      } else {
        toast.error(`Bir hata meydana geldi`, {
          description: `Daha sonra tekrar deneyin!`,
          position: "top-right",
        });
        throw new Error("deleteBook ile ilgili bir hata oluştu");
      }
    } catch (error: any) {
      switch (error.response.status) {
        case 403:
          toast.error(`YETKİ HATASI`, {
            description: `Bu kitabı silebilmek için yetkininiz bulunmamaktadır.`,
            position: "top-right",
          });
          break;
        case 409:
          toast.error(`KİTAP KULLANIMDA`, {
            description: `Bu kitap şu anda başkasının kütüphanesinde bulunmakta. Kitabı silebilmek için önce herkesin kitaplığından kaldırması gerekmektedir!`,
            position: "top-right",
          });
          break;
      }

      throw new Error(`deleteBook try&catch hata -> ${error}`);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {book.book_title} kitabını kalıcı olarak silmek istediğine emin
            misin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Bu kitabı kaldırırsan bu işlemi geri alamzsın ve eğer bu kitabı
            kitaplığına eklemiş kimse yoksa, kitap kalıcı olarak tüm kitaplıktan
            kaldırılıcaktır.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-600"
            onClick={() => deleteBook(book.book_id)}
          >
            Sil
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteGeneralBookDialog;
