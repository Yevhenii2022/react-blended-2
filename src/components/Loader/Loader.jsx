import { Circles } from 'react-loader-spinner';
import { Backdrop } from 'components/Backdrop/Backdrop.styled';

export const Loader = () => {
  return (
    <Backdrop>
      <Circles
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="circles-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </Backdrop>
  );
};
