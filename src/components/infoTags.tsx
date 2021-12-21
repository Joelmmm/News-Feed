import { Tag } from "antd";
import dayjs from "dayjs";

interface Props {
  date: string;
}

function InfoTags({ date }: Props) {
  return (
    <div className='info-tags'>
      <Tag>{dayjs(date).format('DD/MM/YYYY')}</Tag>
    </div>
  );
}

export default InfoTags;
