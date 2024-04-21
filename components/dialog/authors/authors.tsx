import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { IoAlertCircleOutline } from "react-icons/io5";
import "./author.css";
import AuthorTablePage from "./author_table/author-table-page";
import CreateAuthor from "./create-author";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const Authors: React.FC<CreateCategoryProps> = ({ openModal, closeModal }) => {
  const user = useCurrentUser();
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent
        className="
      create-author_dialog"
      >
        <DialogHeader className="max-sm:w-fit">
          <DialogTitle>Yazar bilgileri</DialogTitle>
        </DialogHeader>

        {user?.role == 1 && (
          <Alert className="mt-4" variant="destructive">
            <IoAlertCircleOutline className="h-4 w-4" />
            <AlertTitle>Geçersiz Yetki</AlertTitle>
            <AlertDescription>
              Yetkiniz yeni yazar eklemenize izin vermiyor. Lütfen
              yöneticinizden yetkinizi yükseltmeyi talep edin.
            </AlertDescription>
          </Alert>
        )}

        <CreateAuthor />
        <AuthorTablePage />
      </DialogContent>
    </Dialog>
  );
};

export default Authors;
