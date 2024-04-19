import { AxiosResponse } from "axios";
import EventEmitter from "events";
import { toast } from "sonner";

interface PatchCallerProps {
  apiCall: Promise<AxiosResponse<any, any>>;
  description?: string;
  eventEmitter: EventEmitter;
  emitterFnc: string;
}

const PatchCaller = async ({
  apiCall,
  description,
  eventEmitter,
  emitterFnc,
}: PatchCallerProps) => {
  try {
    const res = await apiCall;
    if (res.status == 200) {
      eventEmitter.emit(emitterFnc);
      toast.success(`GÜNCELLEME BAŞARILI`, {
        description: `${description}`,
        position: "top-right",
        style: {
          backgroundColor: "hsl(143, 85%, 96%)",
          color: "hsl(140, 100%, 27%)",
          borderColor: "hsl(145, 92%, 91%)",
        },
      });
    } else {
      toast.error(`Bir hata meydana geldi`, {
        description: `Daha sonra tekrar deneyin!`,
        position: "top-right",
      });
      console.log(`patch caller error -> ${res}`);
    }
  } catch (error) {
    if(error == "AxiosError: Request failed with status code 401"){
      console.log("yetki hatası")
    }
    // toast.error(`HATA`, {
    //   description: `${error}`,
    //   position: "top-right",
    // });
    // console.log(`API call error -> ${error}`);
  }
};

export default PatchCaller;
