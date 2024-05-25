import React from 'react'

export default function AnaliticasTerapeuta() {
  return (
    <div className="analyse">
        <div className="sales">
            <div className="status">
                <div className="info">
                    <h3>Acuden</h3>
                    <h1>24</h1>
                </div>
                <div className="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div className="percentage">
                        <p>78%</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="visibility">
            <div className="status">
                <div className="info">
                    <h3>No acuden</h3>
                    <h1>7</h1>
                </div>
                <div className="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div className="percentage">
                        <p>22%</p>
                    </div>
                </div>
            </div>
        </div>
        <div className="searches">
            <div className="status">
                <div className="info">
                    <h3>Registros completos</h3>
                    <h1>135</h1>
                </div>
                <div className="progress">
                    <svg>
                        <circle cx="38" cy="38" r="36"></circle>
                    </svg>
                    <div className="percentage">
                        <p>87.5%</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
