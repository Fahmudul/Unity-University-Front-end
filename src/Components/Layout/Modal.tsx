import { useState } from "react";
import { Button, Modal } from "antd";
import { useBlockUserMutation } from "../../Redux/Features/Admin/userManagement.api";

const ConfirmationModal = ({ id, status }: { id: string; status: string }) => {
  // console.log(id);
  const [blockUser] = useBlockUserMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (status: string) => {
    console.log("Block User", id);
    console.log(status);
    const updatedStatus = status === "blocked" ? "in-progress" : "blocked";
    await blockUser({ id, data: { status: updatedStatus } });
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        {status === "blocked" ? "Unblock" : "Block"}
      </Button>
      <Modal
        title="Confirmation Block"
        open={isModalOpen}
        onOk={() => handleOk(status)}
        onCancel={handleCancel}
      >
        <p>Are you sure want to block this user</p>
      </Modal>
    </>
  );
};

export default ConfirmationModal;
