import React, {Fragment} from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';

const PageButton = (props) => {

  function goBack(){
    if (props.index >= 9){
      return props.handleBackPage()
    } else {
      alert("You've gone too far")
    }
  }

  function goForword(){
    if (props.index < 35){
      return props.handleForwardPage()
    } else {
      alert("同学，你走的太远了")
    }
  }

  return (
    <Fragment>
      <Button.Group id="pageBtn">
        <Button onClick={goBack} labelPosition='left' icon='left chevron' content='Back' />
        <Button onClick={goForword} labelPosition='right' icon='right chevron' content='Next' />
      </Button.Group>
      <br />
      <p> </p>
      <br />
    </Fragment>
  )
}

const mapStateToProps = (state) => {
  return {
    index: state.index
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    handleBackPage(){
      const action = {
        type: 'GO_BACK'
      }
      dispatch(action)
    },
    handleForwardPage(){
      const action = {
        type: 'GO_FORWARD'
      }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PageButton);
