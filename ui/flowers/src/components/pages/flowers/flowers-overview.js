import * as React from 'react'
import {
  compose,
  withHandlers,
  withState,
  defaultProps,
  lifecycle
} from 'recompose'
import {withSpinner} from 'react-with-spinner'
import List from 'react-toolbox/lib/list/List'
import Redirect from 'react-router/Redirect'
import ListItem from 'react-toolbox/lib/list/ListItem'
import {GET_FLOWER_LIST_URL} from '../../../config/urls'
import {ListFlowers} from '../../ui/list-flowers'

const enhance = compose(
  withState('data', 'setData', {loading: true}),
  withState('flowers', 'setFlowers', []),
  withHandlers({
    setLoading: ({setData}) => isLoading =>
      setData(data => ({
        ...data,
        loading: isLoading
      }))
  }),
  lifecycle({
    componentDidMount(props) {
      fetch(GET_FLOWER_LIST_URL)
        .then(response => response.json())
        .then(flowers => {
          this.props.setFlowers(flowers)
          this.props.setLoading(false)
        })
        .catch(error => {
          // handle error
          console.log(error)
        })
    }
  }),
  withSpinner()
)

export const StatelessFlowersOverview = ({
  flowers,
  intl,
  redirect,
  viewFlower,
  match
}) => (
  <div>
    <h1>Flowers list</h1>
    <ListFlowers flowers={flowers} match={match} />
  </div>
)

export const FlowersOverview = enhance(StatelessFlowersOverview)
