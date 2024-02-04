import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import PublisherTablePage from "./publisher_table/publisher-table-page";
interface Publishers {
  openModal: boolean;
  closeModal: () => void;
}
const Publishers: React.FC<Publishers> = ({
  openModal,
  closeModal,
}) => {
 

 
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Yayınevi bilgileri</DialogTitle>
        </DialogHeader>

        <p>publisher ekranı genel</p>

        <PublisherTablePage/>

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default Publishers;
