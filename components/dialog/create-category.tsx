import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
interface CreateCategoryProps {
    openModal: boolean;
    closeModal: () => void;
  }
const CreateCategory: React.FC<CreateCategoryProps> = ({openModal, closeModal}) => {
    
  const handleCloseModal = () => {
    openModal = false;
    console.log("kapanması lazım");
  };
  return (
    <Dialog open={openModal} onOpenChange={() => closeModal()}>
      {/* <DialogTrigger asChild>
        <Button variant="default" onClick={onClose}>Edit Profile</Button>
      </DialogTrigger> */}

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kategori Ekle</DialogTitle>
          <DialogDescription>
            asdgasdfasdgsafasgddsafasg
          </DialogDescription>
        </DialogHeader>
        <p>test deneme</p>
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" value="@peduarte" className="col-span-3" />
          </div>
        </div> */}
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategory;
