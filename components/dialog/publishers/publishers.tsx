import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCurrentUser } from "@/hooks/use-current-user";
import { IoAlertCircleOutline } from "react-icons/io5";
import CreatePublisher from "./create-publisher";
import PublisherTablePage from "./publisher_table/publisher-table-page";
interface Publishers {
  openModal: boolean;
  closeModal: () => void;
}
const Publishers: React.FC<Publishers> = ({ openModal, closeModal }) => {
  const user = useCurrentUser();
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Yayınevi bilgileri</DialogTitle>
        </DialogHeader>

        {user?.role == 1 && (
          <Alert className="mt-4" variant="destructive">
            <IoAlertCircleOutline className="h-4 w-4" />
            <AlertTitle>Geçersiz Yetki</AlertTitle>
            <AlertDescription>
              Yetkiniz yeni yayınevi eklemenize izin vermiyor. Lütfen
              yöneticinizden yetkinizi yükseltmeyi talep edin.
            </AlertDescription>
          </Alert>
        )}

        <CreatePublisher user={user} />
        <PublisherTablePage />
      </DialogContent>
    </Dialog>
  );
};

export default Publishers;
