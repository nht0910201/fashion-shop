import React from "react";
import { Modal, Button, Image } from "@nextui-org/react";

export default function SizeChoosing() {
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);
  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };
  return (
    <div>
      <Button animated={false} auto light onClick={handler}>
         Hướng dẫn chọn size
      </Button>
      <Modal scroll width="50%" open={visible} onClose={closeHandler}>
        <Modal.Body>
          <Image
            showSkeleton
            src="https://file.hstatic.net/1000184601/file/01_7d60048803214e62bd2bcbc4a3e6da81.png"
          />
        </Modal.Body>
      </Modal>
    </div>
  );
}
