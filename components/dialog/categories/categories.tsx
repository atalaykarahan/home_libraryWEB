import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
// import PublisherTablePage from "./category_table/publisher-table-page";
import CreateCategory from "./create-category";
import CategoryTablePage from "./category_table/category-table-page";
interface CreateCategoryProps {
  openModal: boolean;
  closeModal: () => void;
}
const Cateogries: React.FC<CreateCategoryProps> = ({ openModal, closeModal }) => {
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      <DialogContent className="md:max-w-[725px]">
        <DialogHeader>
          <DialogTitle>Kategori bilgileri</DialogTitle>
        </DialogHeader>
        <CreateCategory />
        <CategoryTablePage/>
      </DialogContent>
    </Dialog>
  );
};

export default Cateogries;
