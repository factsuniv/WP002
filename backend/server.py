from fastapi import FastAPI, APIRouter, HTTPException
from fastapi.responses import JSONResponse, FileResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Dict, Optional
import uuid
from datetime import datetime
import json
import numpy as np
import pandas as pd

# Import QOFA modules
from qofa_core import QuantumOptionsFlowAnalyzer, OptionsFlowSignal
from whitepaper_generator import QOFAWhitePaper


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="QOFA - Quantum Options Flow Analysis", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize QOFA analyzer
qofa_analyzer = QuantumOptionsFlowAnalyzer()
whitepaper_generator = QOFAWhitePaper()


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class MarketDataInput(BaseModel):
    symbol: str
    price_data: List[float]
    volume_data: List[float]
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class OptionsChainInput(BaseModel):
    symbol: str
    options_data: List[Dict]  # strike, volume, implied_volatility, etc.

class QuantumAnalysisRequest(BaseModel):
    symbols: List[str]
    analysis_type: str = "flow_detection"  # flow_detection, entanglement, risk_assessment

class TradingSignalResponse(BaseModel):
    signals: List[Dict]
    confidence: float
    quantum_metrics: Dict
    timestamp: datetime

# Existing routes
@api_router.get("/")
async def root():
    return {"message": "QOFA - Quantum Options Flow Analysis API", "version": "1.0.0"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# QOFA-specific endpoints
@api_router.get("/whitepaper")
async def get_whitepaper():
    """Get the complete QOFA white paper content"""
    try:
        whitepaper_content = whitepaper_generator.generate_complete_whitepaper()
        return JSONResponse(content=whitepaper_content)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/whitepaper/markdown")
async def get_whitepaper_markdown():
    """Get the white paper in markdown format"""
    try:
        markdown_content = whitepaper_generator.export_to_markdown()
        return {"content": markdown_content, "format": "markdown"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/analyze/quantum-flow")
async def analyze_quantum_flow(data: MarketDataInput):
    """Analyze quantum options flow for a given symbol"""
    try:
        # Convert input to DataFrame
        market_df = pd.DataFrame({
            'symbol': [data.symbol] * len(data.price_data),
            'price': data.price_data,
            'volume': data.volume_data,
            'strike': data.price_data,  # Simplified for demo
            'timestamp': [data.timestamp] * len(data.price_data)
        })
        
        # Analyze using QOFA
        flow_signals = qofa_analyzer.institutional_flow_detection(market_df)
        trading_signals = qofa_analyzer.generate_trading_signals(market_df)
        
        # Calculate quantum metrics
        quantum_state = qofa_analyzer.quantum_field_operator(
            np.array(data.price_data), 
            np.array(data.volume_data)
        )
        
        quantum_correlation = np.mean(np.abs(quantum_state))
        # Handle NaN or None values
        if quantum_correlation is None or np.isnan(quantum_correlation):
            quantum_correlation = 0.0
        
        quantum_metrics = {
            'coherence_time': qofa_analyzer.decoherence_time,
            'entanglement_threshold': qofa_analyzer.entanglement_threshold,
            'quantum_correlation': float(quantum_correlation),
            'signal_count': len(flow_signals)
        }
        
        return TradingSignalResponse(
            signals=trading_signals,
            confidence=np.mean([s.confidence for s in flow_signals]) if flow_signals else 0.0,
            quantum_metrics=quantum_metrics,
            timestamp=datetime.utcnow()
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/analyze/entanglement")
async def analyze_entanglement(request: QuantumAnalysisRequest):
    """Analyze quantum entanglement between multiple market instruments"""
    try:
        # Generate sample market data for demonstration
        market_data = {}
        for symbol in request.symbols:
            # Generate realistic sample data
            np.random.seed(hash(symbol) % 1000)
            prices = np.random.normal(100, 15, 100)
            volumes = np.random.exponential(1000, 100)
            market_data[symbol] = prices + volumes * 0.01  # Simple correlation
        
        # Analyze entanglement
        entanglement_entropy = qofa_analyzer.entanglement_detection(market_data)
        
        # Convert complex matrix to JSON-serializable format
        entanglement_matrix_serializable = []
        if qofa_analyzer.entanglement_matrix is not None:
            matrix = qofa_analyzer.entanglement_matrix
            entanglement_matrix_serializable = [
                [{"real": float(cell.real), "imag": float(cell.imag)} for cell in row]
                for row in matrix
            ]
        
        return {
            "entanglement_entropy": float(entanglement_entropy),
            "entanglement_matrix": entanglement_matrix_serializable,
            "symbols": request.symbols,
            "analysis_type": "entanglement",
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/analyze/risk-assessment")
async def quantum_risk_assessment(portfolio_data: Dict[str, float]):
    """Perform quantum risk assessment for a portfolio"""
    try:
        # Generate sample market conditions
        market_conditions = {}
        for symbol in portfolio_data.keys():
            market_conditions[f"{symbol}_volatility"] = np.random.uniform(0.1, 0.5)
        
        # Add correlation data
        symbols = list(portfolio_data.keys())
        for i, symbol1 in enumerate(symbols):
            for j, symbol2 in enumerate(symbols[i+1:], i+1):
                correlation = np.random.uniform(-0.5, 0.8)
                market_conditions[f"{symbol1}_{symbol2}_correlation"] = correlation
        
        # Perform quantum risk analysis
        risk_metrics = qofa_analyzer.quantum_risk_assessment(portfolio_data, market_conditions)
        
        return {
            "risk_metrics": risk_metrics,
            "portfolio": portfolio_data,
            "market_conditions": market_conditions,
            "timestamp": datetime.utcnow().isoformat()
        }
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/demo/generate-sample-data")
async def generate_sample_data():
    """Generate sample market data for demonstration"""
    try:
        # Generate realistic sample data
        symbols = ["AAPL", "GOOGL", "MSFT", "TSLA", "SPY"]
        sample_data = {}
        
        for symbol in symbols:
            np.random.seed(hash(symbol) % 1000)
            
            # Generate correlated price and volume data
            n_points = 100
            price_base = np.random.uniform(50, 200)
            prices = price_base + np.cumsum(np.random.normal(0, 2, n_points))
            
            # Volume inversely correlated with price changes
            price_changes = np.diff(prices, prepend=prices[0])
            volumes = 1000 + np.abs(price_changes) * 500 + np.random.exponential(200, n_points)
            
            sample_data[symbol] = {
                "prices": prices.tolist(),
                "volumes": volumes.tolist(),
                "symbol": symbol
            }
        
        return sample_data
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.get("/quantum-metrics")
async def get_quantum_metrics():
    """Get current quantum system metrics"""
    try:
        metrics = {
            "planck_constant": qofa_analyzer.planck_constant,
            "decoherence_time": qofa_analyzer.decoherence_time,
            "entanglement_threshold": qofa_analyzer.entanglement_threshold,
            "n_basis_states": qofa_analyzer.n_basis_states,
            "coherence_decay_rate": qofa_analyzer.coherence_decay_rate,
            "system_status": "active",
            "timestamp": datetime.utcnow().isoformat()
        }
        return metrics
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
