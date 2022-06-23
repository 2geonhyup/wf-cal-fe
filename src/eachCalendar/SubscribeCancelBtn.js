const SubscribeCancelBtn = ({ onClick }) => {
  return (
    <button
      className="round-button"
      onClick={async (e) => {
        await onClick();
      }}
    >
      구독취소
    </button>
  );
};

export default SubscribeCancelBtn;
