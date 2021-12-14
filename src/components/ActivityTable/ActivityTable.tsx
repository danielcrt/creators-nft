import React from 'react'
import { Table, Container, Title, Cell, Wrapper, Header, Row } from './ActivityTable.styles'

export const ActivityTable: React.FC = () => {
  const activities = [
    {
      action: 'MINT',
      price: '1 ETH',
      from: '0x123',
      to: '0x456',
      date: '6 months ago',
    }
  ];

  const _renderActivities = () => {
    if (activities.length === 0) {
      return <Row><Cell>No activity yet.</Cell></Row>
    }
    return activities.map((activity, idx) =>
      <Row key={idx}>
        <Cell>{activity.action}</Cell>
        <Cell>{activity.price}</Cell>
        <Cell>{activity.from}</Cell>
        <Cell>{activity.to}</Cell>
        <Cell>{activity.date}</Cell>
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
