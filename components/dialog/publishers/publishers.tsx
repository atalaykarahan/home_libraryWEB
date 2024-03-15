import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PublisherTablePage from "./publisher_table/publisher-table-page";
import CreatePublisher from "./create-publisher";
interface Publishers {
  openModal: boolean;
  closeModal: () => void;
}
const Publishers: React.FC<Publishers> = ({ openModal, closeModal }) => {
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Yayınevi bilgileri</DialogTitle>
        </DialogHeader>

        <CreatePublisher />
        <PublisherTablePage />
      </DialogContent>
    </Dialog>
  );
};

export default Publishers;
