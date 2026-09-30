export interface ProfileEditFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  data: {
    name: string;
    areaId: string;
    address: string;
    phone: string;
    profileImage: string;
  };
  onSuccess: (data: {
    name: string;
    areaId: string;
    address: string;
    phone: string;
    profileImage: string;
  }) => void;
}

export interface FormValues {
  name: string;
  address: string;
  phone: string;
  areaId: string;
  profileImage: FileList;
}
