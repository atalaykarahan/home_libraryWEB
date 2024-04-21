import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useCurrentUser } from "@/hooks/use-current-user";
import { IoAlertCircleOutline } from "react-icons/io5";
import CategoryTablePage from "./category_table/category-table-page";
import CreateCategory from "./create-category";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const Cateogries: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  const user = useCurrentUser();
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Kategori bilgileri</DialogTitle>
        </DialogHeader>
        {user?.role == 1 && (
          <Alert className="mt-4" variant="destructive">
            <IoAlertCircleOutline className="h-4 w-4" />
            <AlertTitle>Geçersiz Yetki</AlertTitle>
            <AlertDescription>
              Yetkiniz yeni kategori eklemenize izin vermiyor. Lütfen
              yöneticinizden yetkinizi yükseltmeyi talep edin.
            </AlertDescription>
          </Alert>
        )}

        <CreateCategory user={user} />
        <CategoryTablePage />
      </DialogContent>
    </Dialog>
  );
};

export default Cateogries;
