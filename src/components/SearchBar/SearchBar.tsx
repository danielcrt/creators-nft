import React, { ChangeEvent, useContext, useState } from 'react'
import { Input, Wrapper, Icon } from './SearchBar.styles'
import SearchLineIcon from 'remixicon-react/SearchLineIcon';
import { HomeContext, IHomeContext } from '../../pages/index.context';

export const SearchBar: React.FC = () => {
  const { setSearchValue } = useContext<IHomeContext>(HomeContext);
  const [value, setValue] = useState<string>('');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  }

  const handleSearch = () => {
    setSearchValue(value);
  }

  return (
    <Wrapper>
      <Input type='text' placeholder='Search' onChange={handleChange} />
      <Icon onClick={handleSearch}>
        <SearchLineIcon size={20} />
      </Icon>
    </Wrapper>
  )
}