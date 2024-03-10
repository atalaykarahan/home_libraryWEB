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
import { AxiosResponse } from "axios";
import EventEmitter from "events";
import { toast } from "sonner";

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string;
  dialogDescription?: string;
  apiCall: Promise<AxiosResponse<any,any>>;
  eventEmitter: EventEmitter;
  emitterFnc: string;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  dialogTitle,
  dialogDescription,
  apiCall,
  eventEmitter,
  emitterFnc,
}) => {

  const handleDelete = async () => {
    try {
      const res = await apiCall;
      if (res.status == 204) {
        eventEmitter.emit(emitterFnc);
        toast.success(`YOK ETME BAŞARILI`, {
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
        console.log(`delete caller error -> ${res}`);
      }
    } catch (error: any) {
      switch (error.response.status) {
        case 403:
          toast.error(`YETKİ HATASI`, {
            description: `Bu veriyi silebilmek için yetkininiz bulunmamaktadır.`,
            position: "top-right",
          });
          break;
        case 409:
          toast.error(`VERİ KULLANIMDA`, {
            description: `Bu veri ile ilişkili şu anda başka veriler bulunmakta. Veriyi silebilmek için önce ilişkili verileri sildiğinizden emin olun!`,
            position: "top-right",
          });
          break;
      }
      console.log(`API call error -> ${error}`);
    }
  }


  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dialogTitle}
          </AlertDialogTitle>
          {/* if dialogDescription is not null than show the description */}
          {dialogDescription && (
            <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          )}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
