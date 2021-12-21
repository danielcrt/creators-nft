import React from 'react'
import { Tag } from '../../common/styles';
import { Transfer } from '../../types';
import { Table, Container, Title, Cell, Wrapper, Header, Row } from './ActivityTable.styles'
import { constants } from 'ethers';
import { useTheme } from 'styled-components';
import { formatDistance, parse } from 'date-fns';
import { DEFAULT_BACKEND_DATE_TIME_FORMAT } from '../../common/utils';
import { usePaginateTopics } from '../../pages/api/ethereum/topics';
import { TokenPurchase } from '../../types/TokenPurchase';

export const ActivityTable: React.FC = () => {
  const { topics } = usePaginateTopics();
  const theme = useTheme();

  const _renderTransferRow = (idx: number, transfer: Transfer) => {
    return <Row key={idx}>
      <Cell><Tag color={theme.colors.secondary}>TRANSFER</Tag></Cell>
      <Cell></Cell>
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
  }

  const _renderPurchaseRow = (idx: number, tokenPurchase: TokenPurchase) => {
    return <Row key={idx}>
      <Cell><Tag color={theme.colors.primary}>MINT</Tag></Cell>
      <Cell>{Number(tokenPurchase.price)} ETH</Cell>
      <Cell></Cell>
      <Cell>{tokenPurchase.buyer}</Cell>
      <Cell>{formatDistance(
        parse(tokenPurchase.created_at, DEFAULT_BACKEND_DATE_TIME_FORMAT, new Date()),
        new Date(),
        {
          addSuffix: true
        }
      )}</Cell>
    </Row>
  }

  const _renderActivities = () => {
    if (topics.length === 0) {
      return <Row><Cell>No activity yet.</Cell></Row>
    }
    return topics.map((topic, idx) => {
      if ((topic.topicable as any).price) {
        return _renderPurchaseRow(idx, topic.topicable as TokenPurchase);
      }
      return _renderTransferRow(idx, topic.topicable as Transfer);
    }
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
