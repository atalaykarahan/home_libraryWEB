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

interface DeleteDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dialogTitle: string[];
  dialogDescription?: string;
  onConfirm: () => void;
}

const DeleteDialog: React.FC<DeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  dialogTitle,
  dialogDescription,
  onConfirm,
}) => {
  return (
    <AlertDialog open={isOpen} onOpenChange={() => setIsOpen(false)}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {dialogTitle.map((title, index) => (
              <span key={index}>{title} </span>
            ))}{" "}
            kalıcı olarak silmek istediğine emin misin?
          </AlertDialogTitle>
          <AlertDialogDescription>
            {dialogDescription ?? "Bu işlemi geri alamzsın!"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>İptal</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Sil</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteDialog;
