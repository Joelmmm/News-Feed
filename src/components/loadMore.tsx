import { Button } from "antd";

interface Props {
  handleClick: () => Promise<void>;
  isLoading: boolean;
}

function LoadMore({ handleClick, isLoading }: Props) {
  return (
    <div id='load-more__container'>
      <Button onClick={handleClick} loading={isLoading} type='primary'>
        <span>Load more</span>
      </Button>
    </div>
  );
}

export default LoadMore;
