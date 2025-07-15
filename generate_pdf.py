#!/usr/bin/env python3
"""
Simple PDF generator for QOFA white paper
"""

import os
from weasyprint import HTML, CSS
from pathlib import Path

def generate_pdf():
    """Generate PDF from HTML white paper"""
    try:
        # Get the HTML file path
        html_file = Path('/app/qofa_white_paper_simple.html')
        pdf_file = Path('/app/QOFA_White_Paper_Simple.pdf')
        
        # Additional CSS for PDF optimization
        pdf_css = CSS(string='''
            @page {
                size: A4;
                margin: 2cm;
            }
            body {
                font-size: 12px;
            }
            .header {
                text-align: center;
                margin-bottom: 30px;
            }
            .title {
                font-size: 20px;
                font-weight: bold;
            }
            .section {
                margin-bottom: 20px;
            }
            .key-point {
                background: #f0f8ff;
                padding: 10px;
                margin: 10px 0;
                border-left: 3px solid #3498db;
            }
            .equation {
                text-align: center;
                font-family: monospace;
                background: #f5f5f5;
                padding: 10px;
                margin: 15px 0;
                border-left: 3px solid #3498db;
            }
        ''')
        
        # Convert HTML to PDF
        HTML(filename=str(html_file)).write_pdf(
            str(pdf_file),
            stylesheets=[pdf_css]
        )
        
        print(f"✅ PDF generated successfully: {pdf_file}")
        print(f"📄 File size: {pdf_file.stat().st_size / 1024:.1f} KB")
        return True
        
    except Exception as e:
        print(f"❌ Error generating PDF: {e}")
        return False

if __name__ == "__main__":
    generate_pdf()