import * as React from 'react'
import {
  compose,
  withHandlers,
  withState,
  defaultProps,
  lifecycle,
  mapProps
} from 'recompose'
import {withSpinner} from 'react-with-spinner'
import List from 'react-toolbox/lib/list/List'
import ListItem from 'react-toolbox/lib/list/ListItem'
import {GET_FLOWER_LIST_URL} from '../../config/urls'
import {Timeline as ReactTimeline, TimelineEvent} from 'react-event-timeline'
import WaterPumpIcon from 'mdi-react/WaterPumpIcon'
import {materialColors} from 'styled-material/dist/src/colors'
import styled from 'styled-components'
import {Column, Row} from 'styled-material/dist/src/layout'
import format from 'date-fns/format'
import Card from 'react-toolbox/lib/card/Card'
import CardMedia from 'react-toolbox/lib/card/CardMedia'
import CardTitle from 'react-toolbox/lib/card/CardTitle'
import CardText from 'react-toolbox/lib/card/CardText'
import CardActions from 'react-toolbox/lib/card/CardActions'
import {StyledCard} from './count-down'
import {Caption, Body, Title} from 'styled-material/dist/src/typography'
import Button from 'react-toolbox/lib/button/Button'

const enhance = compose(
  withState('displayMore', 'setDisplayMore', false),
  mapProps(({timeline, displayMore, ...props}) => {
    return {
      ...props,
      timeline,
      timelineFirstItems: [...timeline]
        .reverse()
        .slice(0, displayMore ? timeline.length : 4),
      displayMore
    }
  })
)

const StyledTimelineItemWrap = styled(Row)`
  margin-left: 16px;
  height: 64px;
  align-items: center;
`

const StyledTimelineItemBorder = styled(Row)`
  justify-content: center;
  border-right: 2px solid ${materialColors['grey-500']};
  height: 100%;
  margin-left: 6px;
  margin-right: 22px;
`

const StyledIconWarp = styled.div`
  margin-right: -18px;
  background-color: white;
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledTimelineitemCaption = styled(Caption)`
  color: ${materialColors['grey-500']};
  font-size: 10px;
`

const EmmptyTimeline = () => (
  <Row
    horizontal="center"
    style={{
      margin: 16
    }}
  >
    <Caption>No timline entrys</Caption>
  </Row>
)

const TimelineItem = ({timestamp, children, icon}) => (
  <StyledTimelineItemWrap>
    <Column style={{flex: 0}}>
      <Row>
        <StyledTimelineitemCaption>
          {format(timestamp, 'MM/DD')}
        </StyledTimelineitemCaption>
      </Row>
      <Row horizontal="flex-end">
        <StyledTimelineitemCaption>
          {format(timestamp, 'HH:mm')}
        </StyledTimelineitemCaption>
      </Row>
    </Column>
    <StyledTimelineItemBorder vertical="center">
      <StyledIconWarp>{icon}</StyledIconWarp>
    </StyledTimelineItemBorder>
    <Row>{children}</Row>
  </StyledTimelineItemWrap>
)

export const StatelessTimelineCard = ({
  timeline,
  timelineFirstItems,
  displayMore,
  setDisplayMore
}) => (
  <StyledCard>
    <CardTitle subtitle="Flower watering timeline" />
    {timelineFirstItems.length ? (
      timelineFirstItems.map(({timestamp, amount}, i) => (
        <TimelineItem
          key={i}
          timestamp={new Date(timestamp)}
          icon={
            <WaterPumpIcon
              style={{
                height: 16,
                fill: materialColors['amber-600']
              }}
            />
          }
        >
          <Body>Amount: {amount}</Body>
        </TimelineItem>
      ))
    ) : (
      <EmmptyTimeline />
    )}
    {!displayMore && timeline.length > 4 ? (
      <Button
        label="Show more"
        raised
        primary
        onClick={() => setDisplayMore(true)}
      />
    ) : null}
  </StyledCard>
)

const StyledBox = styled(Column)`
  padding: 16px;
  max-width: 500px;
`

const StyledBoxTitle = styled(Title)`
  color: #444444;
  margin-bottom: 32px;
  padding: 20px 0px 14px;
`

const StyledBody = styled(Body)`
  color: ${materialColors['grey-600']};
`

export const StatelessTimelineBox = ({
  timeline,
  timelineFirstItems,
  displayMore,
  setDisplayMore
}) => (
  <StyledBox>
    <StyledBoxTitle>Watering timeline</StyledBoxTitle>
    {timelineFirstItems.length ? (
      timelineFirstItems.map(({timestamp, amount}, i) => (
        <TimelineItem
          key={i}
          timestamp={new Date(timestamp)}
          icon={
            <WaterPumpIcon
              style={{
                height: 16,
                fill: materialColors['amber-600']
              }}
            />
          }
        >
          <StyledBody>Amount: {amount}</StyledBody>
        </TimelineItem>
      ))
    ) : (
      <EmmptyTimeline />
    )}
    {!displayMore && timeline.length > 4 ? (
      <Button
        label="Show more"
        raised
        primary
        onClick={() => setDisplayMore(true)}
      />
    ) : null}
  </StyledBox>
)

export const TimelineCard = enhance(StatelessTimelineCard)
export const TimelineBox = enhance(StatelessTimelineBox)
