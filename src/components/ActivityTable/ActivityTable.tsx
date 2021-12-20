import React from 'react'
import { Tag } from '../../common/styles';
import { usePaginateTransfers } from '../../pages/api/ethereum/transfers';
import { Transfer } from '../../types';
import { Table, Container, Title, Cell, Wrapper, Header, Row } from './ActivityTable.styles'
import { constants } from 'ethers';
import { useTheme } from 'styled-components';
import { formatDistance, parse } from 'date-fns';
import { DEFAULT_BACKEND_DATE_TIME_FORMAT } from '../../common/utils';

export const ActivityTable: React.FC = () => {
  const { transfers } = usePaginateTransfers();
  const theme = useTheme();

  const _renderActionType = (transfer: Transfer): JSX.Element => {
    if (transfer.from === constants.AddressZero) {
      return <Tag color={theme.colors.primary}>MINT</Tag>
    }
    return <Tag color={theme.colors.secondary}>TRANSFER</Tag>
  }
  const _renderActivities = () => {
    if (transfers.length === 0) {
      return <Row><Cell>No activity yet.</Cell></Row>
    }
    return transfers.map((transfer, idx) =>
      <Row key={idx}>
        <Cell>{_renderActionType(transfer)}</Cell>
        {/* <Cell>{Number(transfer.price)} ETH</Cell> */}
        <Cell>ETH</Cell>
        <Cell>{transfer.from}</Cell>
        <Cell>{transfer.to}</Cell>
        <Cell>{formatDistance(
          parse(transfer.created_at, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date()),
          new Date(),
          {
            addSuffix: true
          }
        )}</Cell>
      </Row>
    )
  }

  return (
    <Container>
      <Title>Latest activity</Title>
      <Table>
        <Wrapper>
          <Header>
            <Cell>Event</Cell>
            <Cell>Price</Cell>
            <Cell>From</Cell>
            <Cell>To</Cell>
            <Cell>Date</Cell>
          </Header>
          {_renderActivities()}
        </Wrapper>
      </Table>
    </Container>
  )
}
