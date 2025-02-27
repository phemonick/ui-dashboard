import { IoIosArrowRoundDown, IoIosArrowRoundUp } from "react-icons/io";


export const SortIcon = ({ direction, columnType }: { direction: 'asc' | 'desc' | 'none', columnType: string }) => {
    if (columnType === 'thumbnails') {
      return null;
    }
    
    if (columnType === 'lastModified') {
      return <IoIosArrowRoundUp size={10} style={{ color: '#111827' }} />;
    }
    
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <IoIosArrowRoundDown 
          style={{ 
            color: direction === 'desc' ? '#111827' : '#D1D5DB',
          }} 
          size={10}
        />
        <IoIosArrowRoundUp 
          style={{ 
            color: direction === 'asc' ? '#111827' : '#D1D5DB',
          }} 
          size={10}
        />
      </div>
    );
  };