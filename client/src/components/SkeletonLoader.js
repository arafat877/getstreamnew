import React from 'react';

const SkeletonLoader = () => (
  <div style={{ position: 'relative' }}>
    <ul className="skeleton-loader__list">
      <li>
        <div className="skeleton-loader__avatar" />
        <div className="skeleton-loader__text">
          <div />
          <div />
        </div>
      </li>
      <li>
        <div className="skeleton-loader__avatar" />
        <div className="skeleton-loader__text">
          <div />
          <div />
        </div>
      </li>
      <li>
        <div className="skeleton-loader__avatar" />
        <div className="skeleton-loader__text">
          <div />
          <div />
        </div>
      </li>
      <li>
        <div className="skeleton-loader__avatar" />
        <div className="skeleton-loader__text">
          <div />
          <div />
        </div>
      </li>
      <li>
        <div className="skeleton-loader__avatar" />
        <div className="skeleton-loader__text">
          <div />
          <div />
        </div>
      </li>
    </ul>
  </div>
);

export default SkeletonLoader;
