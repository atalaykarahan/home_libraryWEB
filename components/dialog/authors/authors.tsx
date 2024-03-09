import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthorTablePage from "./author_table/author-table-page";
import CreateAuthor from "./create-author";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const Authors: React.FC<CreateCategoryProps> = ({
  openModal,
  closeModal,
}) => {
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Yazar bilgileri</DialogTitle>
        </DialogHeader>

        {/* <p>kategori ekranı genel</p> */}

        <CreateAuthor />
        <AuthorTablePage />
        {/* <PublisherTablePage /> */}

        {/* <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
};

export default Authors;
