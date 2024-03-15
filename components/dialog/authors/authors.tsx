import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AuthorTablePage from "./author_table/author-table-page";
import CreateAuthor from "./create-author";
import "./author.css";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const Authors: React.FC<CreateCategoryProps> = ({ openModal, closeModal }) => {
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="
      create-author_dialog">
        <DialogHeader className="max-sm:w-fit">
          <DialogTitle>Yazar bilgileri</DialogTitle>
        </DialogHeader>
        <CreateAuthor />
        <AuthorTablePage />
      </DialogContent>
    </Dialog>
  );
};

export default Authors;
