import { Tag } from "antd";
import dayjs from "dayjs";

interface Props {
  date: string;
  source: string;
}

function InfoTags({ date, source }: Props) {
  return (
    <div className='info-tags'>
    {
      source ? <Tag color="green">{source}</Tag> : null
    }
      <Tag>{dayjs(date).format("DD/MM/YYYY")}</Tag>
    </div>
  );
}

export default InfoTags;
