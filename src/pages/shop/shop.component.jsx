import React from 'react';
import { Route } from 'react-router-dom';

import { connect } from 'react-redux';

import { createStructuredSelector } from 'reselect';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionsPageContainer from '../collection/collection.container';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { selectCollectionFetching, selectIsCollectionsLoaded } from '../../redux/shop/shop.selectors';

class ShopPage extends React.Component {

    componentDidMount() {
        const { fetchCollectionsStart } = this.props;
        fetchCollectionsStart();
    }

    render() {

        const { match } = this.props;

        return (
            <div className='shop-page' >
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverviewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionsPageContainer}
                />
            </div>
        )
    }
}

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
});

const mapDispatchToProps = (dispatch) => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);