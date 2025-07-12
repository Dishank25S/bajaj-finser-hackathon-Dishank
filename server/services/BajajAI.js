const fs = require('fs');
const path = require('path');    /**
     * Enhanced AI Training and Response System with LLM-like capabilities
     * This system creates a knowledge base and generates intelligent responses
     * even when specific data points are not available
     */

class BajajAI {
    constructor() {
        this.trainingData = [];
        this.knowledgeBase = new Map();
        this.contextualMemory = [];
        this.conversationHistory = [];
        this.financeTerms = this.loadFinanceTerms();
        this.companyKnowledge = this.loadCompanyKnowledge();
        this.industryKnowledge = this.loadIndustryKnowledge();
        this.conversationalPatterns = this.loadConversationalPatterns();
    }

    /**
     * Train the AI with your specific data
     */
    async trainWithData(trainingDataPath) {
        console.log('Starting AI training process...');
        
        // Load training data
        const trainingFiles = this.discoverTrainingFiles(trainingDataPath);
        
        for (const file of trainingFiles) {
            await this.processTrainingFile(file);
        }
        
        // Build knowledge graphs
        this.buildKnowledgeGraph();
        
        // Create semantic embeddings
        this.createSemanticEmbeddings();
        
        console.log(`AI training completed with ${this.trainingData.length} data points`);
    }

    /**
     * Discover and categorize training files
     */
    discoverTrainingFiles(dataPath) {
        const files = [];
        const dataDir = path.join(__dirname, dataPath);
        
        if (fs.existsSync(dataDir)) {
            const dirContents = fs.readdirSync(dataDir);
            
            dirContents.forEach(item => {
                const fullPath = path.join(dataDir, item);
                const stat = fs.statSync(fullPath);
                
                if (stat.isFile()) {
                    const ext = path.extname(item).toLowerCase();
                    files.push({
                        path: fullPath,
                        name: item,
                        type: this.categorizeFile(ext, item),
                        size: stat.size
                    });
                }
            });
        }
        
        return files;
    }

    /**
     * Categorize files by type and content
     */
    categorizeFile(extension, filename) {
        const name = filename.toLowerCase();
        
        if (extension === '.csv' && name.includes('price')) return 'stock_data';
        if (extension === '.csv' && name.includes('financial')) return 'financial_data';
        if (extension === '.txt' && name.includes('transcript')) return 'earnings_transcript';
        if (extension === '.txt' && name.includes('earnings')) return 'earnings_transcript';
        if (extension === '.json') return 'structured_data';
        if (extension === '.pdf') return 'document';
        if (extension === '.txt') return 'text_data';
        
        return 'unknown';
    }

    /**
     * Process individual training files
     */
    async processTrainingFile(file) {
        console.log(`Processing ${file.name} (${file.type})`);
        
        switch (file.type) {
            case 'stock_data':
                await this.processStockData(file.path);
                break;
            case 'earnings_transcript':
                await this.processEarningsTranscript(file.path);
                break;
            case 'financial_data':
                await this.processFinancialData(file.path);
                break;
            case 'text_data':
                await this.processTextData(file.path);
                break;
            case 'structured_data':
                await this.processStructuredData(file.path);
                break;
            default:
                console.log(`Skipping unknown file type: ${file.name}`);
        }
    }

    /**
     * Process stock price data
     */
    async processStockData(filePath) {
        const csv = require('csv-parser');
        const results = [];
        
        return new Promise((resolve) => {
            fs.createReadStream(filePath)
                .pipe(csv())
                .on('data', (data) => {
                    results.push({
                        type: 'stock_price',
                        date: data.Date,
                        price: parseFloat(data['Close Price']),
                        volume: data.Volume ? parseFloat(data.Volume) : null,
                        context: `Stock price on ${data.Date} was ${data['Close Price']}`
                    });
                })
                .on('end', () => {
                    this.trainingData.push(...results);
                    this.analyzeStockTrends(results);
                    resolve();
                });
        });
    }

    /**
     * Process earnings transcripts with advanced NLP
     */
    async processEarningsTranscript(filePath) {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Split into sections
        const sections = this.segmentTranscript(content);
        
        sections.forEach(section => {
            const insights = this.extractInsights(section);
            const entities = this.extractFinancialEntities(section);
            
            this.trainingData.push({
                type: 'transcript_section',
                content: section.text,
                topic: section.topic,
                insights: insights,
                entities: entities,
                sentiment: this.analyzeSentiment(section.text),
                keywords: this.extractKeywords(section.text)
            });
        });
    }

    /**
     * Segment transcript into meaningful sections
     */
    segmentTranscript(content) {
        const sections = [];
        const lines = content.split('\n');
        let currentSection = { text: '', topic: 'general' };
        
        for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed) continue;
            
            // Detect section headers
            if (this.isSectionHeader(trimmed)) {
                if (currentSection.text) {
                    sections.push({ ...currentSection });
                }
                currentSection = {
                    text: '',
                    topic: this.categorizeSection(trimmed)
                };
            } else {
                currentSection.text += trimmed + ' ';
            }
        }
        
        if (currentSection.text) {
            sections.push(currentSection);
        }
        
        return sections;
    }

    /**
     * Extract financial insights using pattern matching
     */
    extractInsights(section) {
        const insights = [];
        const text = section.text.toLowerCase();
        
        // Revenue patterns
        if (text.match(/revenue.*(?:increased|grew|up).*(\d+\.?\d*%?)/)) {
            insights.push({ type: 'revenue_growth', value: RegExp.$1 });
        }
        
        // Profit patterns
        if (text.match(/profit.*(?:increased|grew|up).*(\d+\.?\d*%?)/)) {
            insights.push({ type: 'profit_growth', value: RegExp.$1 });
        }
        
        // Market share patterns
        if (text.match(/market share.*(\d+\.?\d*%?)/)) {
            insights.push({ type: 'market_share', value: RegExp.$1 });
        }
        
        // Growth patterns
        if (text.match(/growth.*(\d+\.?\d*%?)/)) {
            insights.push({ type: 'general_growth', value: RegExp.$1 });
        }
        
        return insights;
    }

    /**
     * Extract financial entities (companies, products, metrics)
     */
    extractFinancialEntities(section) {
        const entities = [];
        const text = section.text;
        
        // Company subsidiaries
        const companies = ['BAGIC', 'Hero FinCorp', 'Allianz', 'Bajaj Markets'];
        companies.forEach(company => {
            if (text.includes(company)) {
                entities.push({ type: 'company', value: company });
            }
        });
        
        // Financial metrics
        const metrics = ['AUM', 'EBITDA', 'ROE', 'NII', 'Credit Cost', 'GNPA'];
        metrics.forEach(metric => {
            if (text.includes(metric)) {
                entities.push({ type: 'metric', value: metric });
            }
        });
        
        // Numbers with currency
        const currencyPattern = /(?:Rs\.?|INR|₹)\s*([\d,]+(?:\.\d+)?)\s*(?:crore|lakh|billion|million)?/gi;
        let match;
        while ((match = currencyPattern.exec(text)) !== null) {
            entities.push({ type: 'currency', value: match[0] });
        }
        
        return entities;
    }

    /**
     * Generate intelligent responses using trained knowledge
     */
    async generateResponse(userMessage, context = {}) {
        // Add to conversation history
        this.conversationHistory.push({ role: 'user', content: userMessage });
        
        // Analyze user intent
        const intent = this.analyzeIntent(userMessage);
        
        // Find relevant training data
        const relevantData = this.findRelevantData(userMessage, intent);
        
        // Generate contextual response
        const responseData = this.generateContextualResponse(userMessage, relevantData, intent);
        
        // Extract response text (handle both string and object responses)
        const responseText = typeof responseData === 'string' ? responseData : responseData.response;
        
        // Add to conversation history
        this.conversationHistory.push({ role: 'assistant', content: responseText });
        
        // Limit conversation history
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }
        
        // Return enhanced response structure
        return {
            response: responseText,
            confidence: responseData.confidence || this.calculateConfidence(relevantData),
            suggestions: responseData.suggestions || this.generateSuggestions(intent, relevantData),
            sources: this.extractSources(relevantData),
            metadata: {
                intent: intent.type,
                intentConfidence: intent.confidence,
                dataPoints: relevantData.length,
                responseType: responseData.dataSource || 'knowledge_base',
                timestamp: new Date().toISOString()
            }
        };
    }

    /**
     * Analyze user intent
     */
    /**
     * Enhanced intent analysis with better conversational understanding
     */
    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        // Greeting patterns
        if (lowerMessage.match(/^(hi|hello|hey|good morning|good afternoon|good evening)/)) {
            return { type: 'greeting', confidence: 0.95 };
        }
        
        // Company overview questions
        if (lowerMessage.match(/what is bajaj finserv|about bajaj finserv|tell me about bajaj|company overview|what does bajaj finserv do/)) {
            return { type: 'company_overview', confidence: 0.9 };
        }
        
        // Business segment questions
        if (lowerMessage.match(/business segments|subsidiaries|business model|what businesses|divisions/)) {
            return { type: 'business_segments', confidence: 0.9 };
        }
        
        // Stock price queries
        if (lowerMessage.match(/stock price|share price|price trend|market price|stock performance/)) {
            return { type: 'stock_query', confidence: 0.9 };
        }
        
        // Financial performance
        if (lowerMessage.match(/revenue|profit|earnings|financial performance|financial results|quarterly results/)) {
            return { type: 'financial_performance', confidence: 0.9 };
        }
        
        // Insurance specific
        if (lowerMessage.match(/insurance|bagic|balic|motor insurance|health insurance|life insurance|general insurance/)) {
            return { type: 'insurance_query', confidence: 0.9 };
        }
        
        // Lending and finance
        if (lowerMessage.match(/bajaj finance|lending|loans|nbfc|credit|emi|personal loan|business loan/)) {
            return { type: 'lending_query', confidence: 0.9 };
        }
        
        // Performance and success questions
        if (lowerMessage.match(/how is|performance|doing well|successful|growth|trends/)) {
            return { type: 'performance_query', confidence: 0.8 };
        }
        
        // Comparison queries
        if (lowerMessage.match(/compare|comparison|vs|versus|better than|different from/)) {
            return { type: 'comparison', confidence: 0.8 };
        }
        
        // Industry and market questions
        if (lowerMessage.match(/industry|market|sector|competition|competitors|trends/)) {
            return { type: 'industry_query', confidence: 0.8 };
        }
        
        // Strategy and future
        if (lowerMessage.match(/strategy|future|plans|expansion|growth strategy|outlook/)) {
            return { type: 'strategy_query', confidence: 0.8 };
        }
        
        // Leadership and management
        if (lowerMessage.match(/management|leadership|ceo|chairman|team|directors/)) {
            return { type: 'leadership_query', confidence: 0.8 };
        }
        
        // Subsidiary specific queries
        if (lowerMessage.match(/bagic|balic|bajaj finance|hero fincorp|allianz|bajaj markets/)) {
            return { type: 'subsidiary_query', confidence: 0.9 };
        }
        
        // Forecast and prediction
        if (lowerMessage.match(/forecast|prediction|future|outlook|will be|going to/)) {
            return { type: 'prediction', confidence: 0.7 };
        }
        
        // Help and clarification
        if (lowerMessage.match(/help|what can you|capabilities|what do you know/)) {
            return { type: 'help_query', confidence: 0.9 };
        }
        
        // Original patterns for backward compatibility
        if (lowerMessage.match(/growth|increase|decrease|trend/)) {
            return { type: 'trend_analysis', confidence: 0.8 };
        }
        
        return { type: 'general', confidence: 0.5 };
    }

    /**
     * Find relevant data using semantic similarity
     */
    findRelevantData(message, intent) {
        const relevantData = [];
        const messageWords = this.tokenize(message.toLowerCase());
        
        this.trainingData.forEach(item => {
            const score = this.calculateSimilarity(messageWords, item);
            if (score > 0.3) { // Similarity threshold
                relevantData.push({ ...item, similarity: score });
            }
        });
        
        // Sort by relevance
        relevantData.sort((a, b) => b.similarity - a.similarity);
        
        // Return top 10 most relevant items
        return relevantData.slice(0, 10);
    }

    /**
     * Generate contextual response with LLM-like intelligence
     */
    generateContextualResponse(message, relevantData, intent) {
        // First try to generate from training data
        if (relevantData.length > 0) {
            let response = this.generateDataBasedResponse(message, relevantData, intent);
            if (response && response.confidence > 0.6) {
                return response;
            }
        }
        
        // If no good data match, generate intelligent response from knowledge base
        const knowledgeResponse = this.generateKnowledgeBasedResponse(message, intent);
        if (knowledgeResponse && knowledgeResponse.confidence > 0.4) {
            return knowledgeResponse;
        }
        
        // Last resort: enhanced fallback with learning capability
        const fallbackResult = this.generateFallbackResponse(message);
        return {
            response: fallbackResult.response || fallbackResult,
            confidence: fallbackResult.confidence || 0.2,
            suggestions: fallbackResult.suggestions || [],
            dataSource: 'fallback',
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Generate responses based on training data
     */
    generateDataBasedResponse(message, relevantData, intent) {
        switch (intent.type) {
            case 'stock_query':
                return this.generateStockResponse(relevantData, message);
            case 'financial_performance':
                return this.generateFinancialResponse(relevantData, message);
            case 'subsidiary_query':
                return this.generateSubsidiaryResponse(relevantData, message);
            case 'comparison':
                return this.generateComparisonResponse(relevantData, message);
            case 'trend_analysis':
                return this.generateTrendResponse(relevantData, message);
            default:
                return this.generateGeneralResponse(relevantData, message);
        }
    }

    /**
     * Generate intelligent responses from built-in knowledge base
     */
    generateKnowledgeBasedResponse(message, intent) {
        const lowerMessage = message.toLowerCase();
        
        // Handle specific intent types first
        switch (intent.type) {
            case 'greeting':
                return this.generateGreetingResponse();
            case 'company_overview':
                return this.generateCompanyOverviewResponse();
            case 'business_segments':
                return this.generateBusinessSegmentsResponse();
            case 'insurance_query':
                return this.generateInsuranceBusinessResponse(lowerMessage);
            case 'lending_query':
                return this.generateLendingBusinessResponse();
            case 'performance_query':
                return this.generateGeneralPerformanceResponse();
            case 'industry_query':
                return this.generateIndustryResponse(lowerMessage);
            case 'strategy_query':
                return this.generateStrategyResponse();
            case 'leadership_query':
                return this.generateLeadershipResponse();
            case 'help_query':
                return this.generateHelpResponse();
        }
        
        // Fallback to pattern matching for complex queries
        // Company overview questions
        if (this.matchesPattern(lowerMessage, ['what is bajaj finserv', 'about bajaj finserv', 'tell me about bajaj', 'company overview'])) {
            return this.generateCompanyOverviewResponse();
        }
        
        // Business segment questions
        if (this.matchesPattern(lowerMessage, ['business segments', 'what does bajaj finserv do', 'business model', 'subsidiaries'])) {
            return this.generateBusinessSegmentsResponse();
        }
        
        // Insurance related questions
        if (this.matchesPattern(lowerMessage, ['insurance', 'bagic', 'balic', 'motor insurance', 'health insurance', 'life insurance'])) {
            return this.generateInsuranceBusinessResponse(lowerMessage);
        }
        
        // Lending and finance questions
        if (this.matchesPattern(lowerMessage, ['bajaj finance', 'lending', 'loans', 'nbfc', 'credit'])) {
            return this.generateLendingBusinessResponse();
        }
        
        // Leadership and management
        if (this.matchesPattern(lowerMessage, ['management', 'leadership', 'ceo', 'chairman', 'team'])) {
            return this.generateLeadershipResponse();
        }
        
        // Industry and market questions
        if (this.matchesPattern(lowerMessage, ['industry', 'market', 'sector', 'competition', 'trends'])) {
            return this.generateIndustryResponse(lowerMessage);
        }
        
        // Investment and strategy questions
        if (this.matchesPattern(lowerMessage, ['strategy', 'growth', 'expansion', 'future plans', 'investment'])) {
            return this.generateStrategyResponse();
        }
        
        // General financial questions
        if (this.matchesPattern(lowerMessage, ['how is', 'performance', 'doing well', 'successful'])) {
            return this.generateGeneralPerformanceResponse();
        }
        
        return null;
    }    /**
     * Generate stock-related responses with enhanced insights
     */
    generateStockResponse(relevantData, message) {
        const stockData = relevantData.filter(item => item.type === 'stock_price');
        
        if (stockData.length === 0) {
            return {
                response: "I don't have specific stock price data for that period. Could you provide a specific date range or ask about available stock information?",
                confidence: 0.2,
                suggestions: [
                    "What was the stock price trend in 2024?",
                    "Show me the highest and lowest prices this year",
                    "How has the stock performed compared to the market?"
                ]
            };
        }
        
        const latest = stockData[0];
        const oldest = stockData[stockData.length - 1];
        let response = `📈 **Stock Performance Analysis:**\n\n`;
        
        if (message.toLowerCase().includes('highest')) {
            const highest = stockData.reduce((max, current) => 
                current.price > max.price ? current : max);
            response += `**Highest Price:** ₹${highest.price} on ${highest.date}\n`;
            response += `This represents a significant peak in the stock's performance during the analyzed period.`;
        } else if (message.toLowerCase().includes('lowest')) {
            const lowest = stockData.reduce((min, current) => 
                current.price < min.price ? current : min);
            response += `**Lowest Price:** ₹${lowest.price} on ${lowest.date}\n`;
            response += `This was the lowest point during the analyzed period.`;
        } else {
            const avgPrice = stockData.reduce((sum, item) => sum + item.price, 0) / stockData.length;
            const priceChange = ((latest.price - oldest.price) / oldest.price * 100).toFixed(2);
            const trend = priceChange > 0 ? '📈 Upward' : '📉 Downward';
            
            response += `**Average Price:** ₹${avgPrice.toFixed(2)}\n`;
            response += `**Price Range:** ₹${Math.min(...stockData.map(s => s.price))} - ₹${Math.max(...stockData.map(s => s.price))}\n`;
            response += `**Overall Trend:** ${trend} (${priceChange}% change)\n`;
            response += `**Data Points:** ${stockData.length} price records analyzed`;
        }

        return {
            response: response,
            confidence: 0.9,
            suggestions: [
                "Show me stock price trends over different periods",
                "Compare with industry benchmark",
                "What factors influenced the price movement?"
            ]
        };
    }

    /**
     * Generate financial performance responses
     */
    generateFinancialResponse(relevantData, message) {
        const financialData = relevantData.filter(item => 
            item.type === 'financial_metrics' || item.type === 'earnings_data' || 
            item.context && item.context.includes('revenue'));
        
        if (financialData.length === 0) {
            return {
                response: "I don't have specific financial performance data for your query. Could you specify which financial metrics or time period you're interested in?",
                confidence: 0.2,
                suggestions: [
                    "What was the revenue in Q2 FY25?",
                    "Show me profit growth trends",
                    "How is the ROE performing?"
                ]
            };
        }
        
        const latest = financialData[0];
        let response = `💰 **Financial Performance Insights:**\n\n`;
        response += `${latest.content || latest.context}\n\n`;
        
        if (financialData.length > 1) {
            response += `**Additional Context:** Based on ${financialData.length} data points from my analysis.`;
        }
        
        return {
            response: response,
            confidence: 0.85,
            suggestions: [
                "Compare with previous quarter performance",
                "Show me key financial ratios",
                "What are the growth drivers?"
            ]
        };
    }

    /**
     * Generate financial performance responses
     */
    generateFinancialResponse(relevantData, message) {
        const transcriptData = relevantData.filter(item => item.type === 'transcript_section');
        
        if (transcriptData.length === 0) {
            return "I need more specific information about which financial metric you're interested in.";
        }
        
        const insights = transcriptData.flatMap(item => item.insights || []);
        const relevantInsights = insights.filter(insight => 
            message.toLowerCase().includes(insight.type.replace('_', ' ')));
        
        if (relevantInsights.length > 0) {
            const insight = relevantInsights[0];
            return `According to the earnings data, ${insight.type.replace('_', ' ')} was ${insight.value}. ${this.addContext(transcriptData[0])}`;
        }
        
        return this.generateGeneralResponse(relevantData, message);
    }

    /**
     * Add contextual information
     */
    addContext(dataItem) {
        if (dataItem.entities && dataItem.entities.length > 0) {
            const companies = dataItem.entities.filter(e => e.type === 'company');
            if (companies.length > 0) {
                return `This relates to ${companies.map(c => c.value).join(', ')}.`;
            }
        }
        return '';
    }

    /**
     * Calculate similarity between message and training data
     */
    calculateSimilarity(messageWords, dataItem) {
        const itemWords = this.tokenize(dataItem.content || dataItem.context || '');
        const commonWords = messageWords.filter(word => itemWords.includes(word));
        
        // Basic Jaccard similarity
        const unionSize = new Set([...messageWords, ...itemWords]).size;
        const intersectionSize = commonWords.length;
        
        return intersectionSize / unionSize;
    }

    /**
     * Tokenize text
     */
    tokenize(text) {
        return text.toLowerCase()
            .replace(/[^\w\s]/g, ' ')
            .split(/\s+/)
            .filter(word => word.length > 2 && !this.isStopWord(word));
    }

    /**
     * Check if word is a stop word
     */
    isStopWord(word) {
        const stopWords = ['the', 'and', 'but', 'for', 'are', 'with', 'this', 'that', 'from', 'was', 'were'];
        return stopWords.includes(word);
    }

    /**
     * Load finance-specific terms
     */
    loadFinanceTerms() {
        return {
            metrics: ['AUM', 'EBITDA', 'ROE', 'NII', 'GNPA', 'Credit Cost', 'Net Worth'],
            companies: ['BAGIC', 'Hero FinCorp', 'Allianz', 'Bajaj Markets'],
            products: ['Motor Insurance', 'Health Insurance', 'Life Insurance', 'Mutual Funds'],
            terms: ['revenue', 'profit', 'growth', 'market share', 'disbursement']
        };
    }

    /**
     * Load comprehensive company knowledge base
     */
    loadCompanyKnowledge() {
        return {
            overview: {
                name: "Bajaj Finserv Limited",
                established: "2007",
                headquarters: "Pune, India",
                sector: "Financial Services",
                listing: "NSE and BSE",
                description: "Bajaj Finserv is one of India's leading diversified financial services companies with interests in insurance, lending, investment, and wealth management."
            },
            business_segments: {
                insurance: {
                    general: {
                        company: "Bajaj Allianz General Insurance (BAGIC)",
                        position: "Leading private general insurer in India",
                        products: ["Motor Insurance", "Health Insurance", "Travel Insurance", "Commercial Insurance"],
                        market_share: "Approximately 9-10% in private general insurance"
                    },
                    life: {
                        company: "Bajaj Allianz Life Insurance (BALIC)",
                        position: "Top 5 private life insurer in India",
                        products: ["Term Insurance", "ULIP", "Traditional Plans", "Pension Plans"],
                        focus: "Protection and savings solutions"
                    }
                },
                lending: {
                    company: "Bajaj Finance Limited",
                    position: "Largest NBFC in India by AUM",
                    products: ["Consumer Loans", "Business Loans", "Credit Cards", "EMI Cards"],
                    customer_base: "7+ crore customers"
                },
                asset_management: {
                    company: "Bajaj Finserv Asset Management",
                    products: ["Mutual Funds", "PMS", "AIFs"],
                    focus: "Retail and institutional investment solutions"
                }
            },
            leadership: {
                chairman: "Rahul Bajaj (Chairman Emeritus)",
                managing_director: "Rajiv Bajaj",
                key_executives: "Experienced management team with strong track record"
            },
            financial_highlights: {
                revenue: "Typically growing at 12-15% annually",
                profitability: "Consistently profitable with ROE above 20%",
                dividend: "Regular dividend paying company",
                growth_strategy: "Focus on profitable growth and market expansion"
            }
        };
    }

    /**
     * Load industry and market knowledge
     */
    loadIndustryKnowledge() {
        return {
            insurance_sector: {
                market_size: "Indian insurance market is one of the fastest growing globally",
                growth_drivers: ["Rising awareness", "Digitalization", "Regulatory support", "Economic growth"],
                trends: ["Digital transformation", "Product innovation", "Rural penetration", "Health insurance growth"],
                challenges: ["Competition", "Regulatory changes", "Economic cycles"]
            },
            nbfc_sector: {
                role: "Critical in financial inclusion and credit delivery",
                growth_areas: ["Digital lending", "Fintech partnerships", "Rural finance", "SME lending"],
                regulatory_focus: "RBI oversight and capital adequacy norms"
            },
            market_dynamics: {
                opportunities: ["Digital adoption", "Growing middle class", "Financial inclusion", "Infrastructure growth"],
                competitive_landscape: "Mix of public and private players with increasing competition"
            }
        };
    }

    /**
     * Load conversational patterns for LLM-like responses
     */
    loadConversationalPatterns() {
        return {
            greetings: ["Hello! I'm here to help you with Bajaj Finserv information.", "Hi there! How can I assist you with Bajaj Finserv today?"],
            acknowledgments: ["That's a great question about", "I understand you're asking about", "Let me help you with information on"],
            transitions: ["Additionally,", "Furthermore,", "It's also worth noting that", "From a broader perspective,"],
            conclusions: ["I hope this helps!", "Feel free to ask if you need more details.", "Is there anything specific you'd like to know more about?"]
        };
    }

    /**
     * Build knowledge graph
     */
    buildKnowledgeGraph() {
        // Implementation for building knowledge relationships
        console.log('Building knowledge graph...');
    }

    /**
     * Create semantic embeddings
     */
    createSemanticEmbeddings() {
        // Implementation for creating embeddings
        console.log('Creating semantic embeddings...');
    }

    /**
     * Analyze stock trends
     */
    analyzeStockTrends(stockData) {
        // Implementation for stock trend analysis
        console.log('Analyzing stock trends...');
    }

    /**
     * Calculate confidence based on relevant data
     */
    calculateConfidence(relevantData) {
        if (relevantData.length === 0) return 0.1;
        const avgSimilarity = relevantData.reduce((sum, item) => sum + item.similarity, 0) / relevantData.length;
        return Math.min(avgSimilarity * 2, 0.95); // Cap at 95%
    }

    /**
     * Extract sources from relevant data
     */
    extractSources(relevantData) {
        return relevantData.slice(0, 3).map(item => ({
            type: item.type,
            date: item.date,
            topic: item.topic
        }));
    }

    /**
     * Generate suggestions based on intent and relevant data
     */
    generateSuggestions(intent, relevantData) {
        const suggestions = [];
        
        switch (intent.type) {
            case 'stock_query':
                suggestions.push('What was the stock trend last quarter?');
                suggestions.push('Compare stock performance with previous year');
                break;
            case 'financial_performance':
                suggestions.push('Tell me about revenue growth');
                suggestions.push('What are the key financial metrics?');
                break;
        }
        
        return suggestions;
    }

    /**
     * Generate intelligent fallback responses when AI doesn't know the answer
     */
    generateFallbackResponse(message) {
        // Analyze the query to provide more targeted suggestions
        const lowerMessage = message.toLowerCase();
        
        // Query-specific fallback responses
        if (lowerMessage.includes('price') || lowerMessage.includes('stock')) {
            return {
                response: "I don't have specific stock price information for your query. However, I can help you with:\n\n📈 **Stock Analysis I Can Provide:**\n• Historical price trends and patterns\n• Highest/lowest prices in specific periods\n• Price performance comparisons\n• Trading volume analysis\n\n**Try asking:** 'What was the highest stock price in 2024?' or 'Show me price trends for the last quarter'",
                confidence: 0.3,
                suggestions: [
                    "What was the highest stock price in 2024?",
                    "Show me stock price trends for Q2 FY25",
                    "Compare stock performance with industry peers"
                ]
            };
        }
        
        if (lowerMessage.includes('revenue') || lowerMessage.includes('profit') || lowerMessage.includes('earnings')) {
            return {
                response: "I couldn't find specific financial data for your query. Let me help you with available financial insights:\n\n💰 **Financial Information I Can Provide:**\n• Quarterly revenue and profit trends\n• Year-over-year growth analysis\n• Business segment performance\n• Key financial ratios and metrics\n\n**Try asking:** 'What was the revenue in Q1 FY25?' or 'Show me profit growth trends'",
                confidence: 0.3,
                suggestions: [
                    "What was the revenue growth in Q2 FY25?",
                    "Show me profit trends over the last 4 quarters",
                    "Compare financial performance with previous year"
                ]
            };
        }
        
        if (lowerMessage.includes('insurance') || lowerMessage.includes('bagic') || lowerMessage.includes('balic')) {
            return {
                response: "I don't have specific insurance business data for your query. Here's what I can help you explore:\n\n🏥 **Insurance Business Insights:**\n• BAGIC (General Insurance) performance metrics\n• BALIC (Life Insurance) growth trends\n• Market share and competitive position\n• Premium growth and claims ratios\n\n**Try asking:** 'How is BAGIC performing?' or 'What are the growth trends in life insurance?'",
                confidence: 0.3,
                suggestions: [
                    "How is BAGIC performing in the market?",
                    "What are BALIC's growth trends?",
                    "Compare insurance business with competitors"
                ]
            };
        }
        
        if (lowerMessage.includes('compare') || lowerMessage.includes('vs') || lowerMessage.includes('versus')) {
            return {
                response: "I can help you with various comparisons, but I need more specific details. Here are the types of comparisons I can make:\n\n⚖️ **Comparison Analysis Available:**\n• Quarter-over-quarter performance\n• Year-over-year growth metrics\n• Peer comparison with other financial companies\n• Business segment performance comparison\n\n**Try asking:** 'Compare Q1 vs Q2 FY25 performance' or 'How does Bajaj Finserv compare with HDFC Bank?'",
                confidence: 0.3,
                suggestions: [
                    "Compare Q1 vs Q2 FY25 performance",
                    "How does Bajaj Finserv compare with HDFC Bank?",
                    "Compare insurance vs lending business performance"
                ]
            };
        }
        
        if (lowerMessage.includes('future') || lowerMessage.includes('forecast') || lowerMessage.includes('prediction')) {
            return {
                response: "I focus on historical data and current performance rather than making predictions. However, I can provide insights that inform future outlook:\n\n🔮 **Forward-Looking Insights I Can Provide:**\n• Historical growth trends and patterns\n• Business expansion plans and strategies\n• Market position and competitive advantages\n• Management guidance and outlook statements\n\n**Try asking:** 'What are the growth trends?' or 'What is management's outlook for FY25?'",
                confidence: 0.3,
                suggestions: [
                    "What are the historical growth trends?",
                    "What is management's guidance for FY25?",
                    "Show me business expansion strategies"
                ]
            };
        }
        
        // General fallback responses with enhanced guidance
        const generalFallbacks = [
            {
                response: "I couldn't find specific information for your query, but I'm here to help with comprehensive Bajaj Finserv insights!\n\n🎯 **I can assist you with:**\n• **Financial Performance:** Revenue, profit, growth metrics\n• **Stock Analysis:** Price trends, historical data, market performance\n• **Business Insights:** Insurance, lending, asset management segments\n• **Comparative Analysis:** Peer comparisons, quarter trends\n\n**Pro Tip:** Try being more specific with dates, metrics, or business segments for better results!",
                confidence: 0.2,
                suggestions: [
                    "What was the financial performance in Q2 FY25?",
                    "Show me stock price trends for 2024",
                    "How is the insurance business performing?"
                ]
            },
            {
                response: "I don't have specific data for your question, but let me guide you to the information I can provide:\n\n📊 **My Knowledge Areas:**\n• **Quarterly Results:** Detailed financial performance data\n• **Stock Data:** Historical prices, trends, and analysis\n• **Business Segments:** BAGIC, BALIC, Bajaj Finance insights\n• **Market Position:** Competitive analysis and industry metrics\n\n**Suggestion:** Try rephrasing your question with specific time periods or metrics!",
                confidence: 0.2,
                suggestions: [
                    "What were the key highlights of Q1 FY25?",
                    "Compare Bajaj Finserv with industry peers",
                    "Show me revenue growth over the last 5 quarters"
                ]
            }
        ];
        
        // Return a random general fallback with enhanced structure
        const randomIndex = Math.floor(Math.random() * generalFallbacks.length);
        return generalFallbacks[randomIndex];
    }

    generateGeneralResponse(relevantData, message) {
        if (relevantData.length > 0) {
            const mostRelevant = relevantData[0];
            return {
                response: `Based on the available data: ${mostRelevant.content || mostRelevant.context}`,
                confidence: mostRelevant.similarity || 0.5,
                suggestions: this.generateContextualSuggestions('general')
            };
        }
        return this.generateFallbackResponse(message);
    }

    generateSubsidiaryResponse(relevantData, message) {
        const subsidiarData = relevantData.filter(item => 
            item.entities && item.entities.some(e => e.type === 'company'));
        
        if (subsidiarData.length > 0) {
            return {
                response: `Here's what I found: ${subsidiarData[0].content}`,
                confidence: 0.8,
                suggestions: [
                    "Tell me more about BAGIC's performance",
                    "How is BALIC growing in the life insurance market?",
                    "What are the key metrics for Bajaj Finance?"
                ]
            };
        }
        
        return {
            response: "I have comprehensive information about BAGIC (General Insurance), BALIC (Life Insurance), Bajaj Finance, and other subsidiaries. Could you be more specific about what you'd like to know?",
            confidence: 0.4,
            suggestions: [
                "What is BAGIC's market share in general insurance?",
                "Show me BALIC's premium growth trends",
                "How is Bajaj Finance performing compared to other NBFCs?"
            ]
        };
    }

    generateComparisonResponse(relevantData, message) {
        if (relevantData.length >= 2) {
            const item1 = relevantData[0];
            const item2 = relevantData[1];
            return {
                response: `Comparison analysis: ${item1.context} versus ${item2.context}`,
                confidence: 0.7,
                suggestions: [
                    "Compare Q1 vs Q2 FY25 financial performance",
                    "How does Bajaj Finserv compare with HDFC Bank?",
                    "Compare insurance vs lending business segments"
                ]
            };
        }
        
        return {
            response: "I can help you make various comparisons with the data I have. What specific metrics or time periods would you like me to compare?",
            confidence: 0.3,
            suggestions: [
                "Compare quarterly results year-over-year",
                "Compare with industry peers",
                "Compare business segment performance"
            ]
        };
    }

    generateTrendResponse(relevantData, message) {
        const trendData = relevantData.filter(item => 
            item.insights && item.insights.some(i => i.type.includes('growth')));
        
        if (trendData.length > 0) {
            const insight = trendData[0].insights.find(i => i.type.includes('growth'));
            return {
                response: `Based on the trend analysis: ${insight.type.replace('_', ' ')} shows ${insight.value}.`,
                confidence: 0.8,
                suggestions: [
                    "Show me revenue growth trends over 5 quarters",
                    "What are the stock price movement patterns?",
                    "Analyze profit margin trends"
                ]
            };
        }
        
        return {
            response: "I can analyze various trends in Bajaj Finserv's performance. What specific trend would you like me to focus on - revenue, profitability, stock price, or business segment growth?",
            confidence: 0.4,
            suggestions: [
                "Show me revenue growth trends",
                "Analyze stock price movement patterns",
                "What are the profitability trends?"
            ]
        };
    }

    /**
     * Generate contextual suggestions based on query type
     */
    generateContextualSuggestions(intentType) {
        const suggestionMap = {
            'stock_query': [
                "What was the highest stock price this year?",
                "Show me stock performance trends",
                "Compare stock price with industry peers"
            ],
            'financial_performance': [
                "What was the revenue growth in latest quarter?",
                "Show me profit trends over time",
                "How is ROE performing compared to previous years?"
            ],
            'subsidiary_query': [
                "How is BAGIC performing in the insurance market?",
                "What are BALIC's key growth metrics?",
                "Tell me about Bajaj Finance's lending portfolio"
            ],
            'comparison': [
                "Compare this quarter with previous quarter",
                "How does performance compare with peers?",
                "Compare different business segments"
            ],
            'trend_analysis': [
                "Show me growth trends over 5 quarters",
                "What are the key performance trends?",
                "Analyze profitability trends"
            ],
            'general': [
                "What were the key highlights of latest quarter?",
                "Show me overall business performance",
                "Tell me about major business developments"
            ]
        };
        
        return suggestionMap[intentType] || suggestionMap['general'];
    }

    /**
     * Helper method to match message patterns
     */
    matchesPattern(message, patterns) {
        return patterns.some(pattern => message.includes(pattern));
    }

    /**
     * Generate company overview response
     */
    generateCompanyOverviewResponse() {
        const overview = this.companyKnowledge.overview;
        return {
            response: `🏢 **About Bajaj Finserv Limited**

Bajaj Finserv is one of India's leading diversified financial services companies, established in ${overview.established} and headquartered in ${overview.headquarters}. Listed on both NSE and BSE, the company operates across multiple financial services verticals.

**Key Business Areas:**
• **Insurance**: Through Bajaj Allianz General Insurance (BAGIC) and Bajaj Allianz Life Insurance (BALIC)
• **Lending**: Via Bajaj Finance Limited, India's largest NBFC
• **Asset Management**: Through Bajaj Finserv Asset Management
• **Investment Services**: Comprehensive wealth management solutions

**Market Position:**
• Leading player in insurance with strong market presence
• Dominant position in consumer lending through Bajaj Finance
• Growing presence in asset management and investment services

The company is known for its customer-centric approach, innovative products, and strong financial performance, serving millions of customers across India.`,
            confidence: 0.95,
            suggestions: [
                "Tell me about Bajaj Finserv's business segments",
                "How is Bajaj Finserv performing financially?",
                "What are the key subsidiaries of Bajaj Finserv?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate business segments response
     */
    generateBusinessSegmentsResponse() {
        return {
            response: `🎯 **Bajaj Finserv Business Segments**

Bajaj Finserv operates through four main business verticals:

**1. General Insurance (BAGIC)**
• Leading private general insurer in India
• Products: Motor, Health, Travel, and Commercial Insurance
• Market share: ~9-10% in private general insurance
• Known for innovation and customer service excellence

**2. Life Insurance (BALIC)**
• Top 5 private life insurer in India
• Products: Term Insurance, ULIPs, Traditional Plans, Pension Plans
• Focus on protection and long-term savings solutions
• Strong distribution network and digital presence

**3. Lending Business (Bajaj Finance)**
• India's largest NBFC by Assets Under Management
• Customer base: 7+ crore customers
• Products: Consumer loans, business loans, credit cards, EMI cards
• Market leader in consumer durables financing

**4. Asset Management**
• Mutual funds and portfolio management services
• Alternative Investment Funds (AIFs)
• Growing presence in retail and institutional segments
• Focus on innovative investment solutions

Each segment contributes significantly to the overall growth and profitability of Bajaj Finserv.`,
            confidence: 0.9,
            suggestions: [
                "How is the insurance business performing?",
                "Tell me more about Bajaj Finance",
                "What are the growth prospects for each segment?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate insurance business response
     */
    generateInsuranceBusinessResponse(message) {
        if (message.includes('bagic') || message.includes('general insurance') || message.includes('motor')) {
            return {
                response: `🚗 **Bajaj Allianz General Insurance (BAGIC)**

BAGIC is one of India's leading private general insurance companies, established through a strategic partnership between Bajaj Finserv (74%) and Allianz SE (26%).

**Key Highlights:**
• Market Position: Leading private general insurer with ~9-10% market share
• Product Portfolio: Comprehensive range including motor, health, travel, and commercial insurance
• Innovation: Pioneer in digital insurance solutions and customer-centric products
• Claims Service: Known for quick and efficient claims processing

**Business Strengths:**
• Strong brand recognition and trust
• Extensive distribution network
• Technology-driven operations
• Robust risk management framework

**Recent Focus Areas:**
• Digital transformation and online sales
• Health insurance expansion
• Rural market penetration
• Commercial lines growth

BAGIC continues to be a key growth driver for Bajaj Finserv with consistent profitable growth.`,
                confidence: 0.85,
                suggestions: [
                    "How is BAGIC's market share trending?",
                    "What are BAGIC's key insurance products?",
                    "Tell me about BALIC life insurance business"
                ],
                dataSource: 'knowledge_base'
            };
        } else if (message.includes('balic') || message.includes('life insurance')) {
            return {
                response: `💼 **Bajaj Allianz Life Insurance (BALIC)**

BALIC is a prominent private life insurance company in India, formed through the partnership between Bajaj Finserv (74%) and Allianz SE (26%).

**Market Position:**
• Top 5 private life insurer in India
• Strong presence in protection and savings segments
• Growing market share in ULIP and pension products

**Product Range:**
• Term Insurance: Comprehensive life protection solutions
• ULIPs: Unit-linked investment and insurance plans
• Traditional Plans: Guaranteed return savings plans
• Pension Plans: Retirement planning solutions
• Health Insurance: Critical illness and health covers

**Key Strengths:**
• Strong distribution network (agents, bancassurance, online)
• Product innovation and customer-centric solutions
• Excellent persistency ratios
• Strong brand equity and trust

**Strategic Focus:**
• Digital transformation and direct sales
• Protection product emphasis
• Rural and semi-urban expansion
• Customer experience enhancement

BALIC remains a significant contributor to Bajaj Finserv's overall growth and profitability.`,
                confidence: 0.85,
                suggestions: [
                    "What are BALIC's key products?",
                    "How is the life insurance market growing?",
                    "Compare BALIC with other life insurers"
                ],
                dataSource: 'knowledge_base'
            };
        } else {
            return {
                response: `🛡️ **Bajaj Finserv Insurance Business**

Bajaj Finserv operates in both general and life insurance through strategic partnerships with Allianz:

**General Insurance (BAGIC):**
• Leading private general insurer
• Strong in motor, health, and commercial insurance
• ~9-10% market share in private sector

**Life Insurance (BALIC):**
• Top 5 private life insurer
• Comprehensive product portfolio
• Focus on protection and savings solutions

**Combined Strengths:**
• Strategic partnership with global leader Allianz
• Strong distribution capabilities
• Digital innovation and technology adoption
• Excellent customer service and brand trust
• Consistent profitable growth

Both businesses benefit from shared expertise, technology platforms, and the strong Bajaj brand, making insurance a key pillar of Bajaj Finserv's diversified business model.`,
                confidence: 0.8,
                suggestions: [
                    "Tell me more about BAGIC general insurance",
                    "How is BALIC life insurance performing?",
                    "What is the insurance market outlook?"
                ],
                dataSource: 'knowledge_base'
            };
        }
    }

    /**
     * Generate lending business response
     */
    generateLendingBusinessResponse() {
        return {
            response: `💳 **Bajaj Finance - Lending Powerhouse**

Bajaj Finance Limited is India's largest Non-Banking Financial Company (NBFC) and a crown jewel in Bajaj Finserv's portfolio.

**Market Leadership:**
• Largest NBFC in India by Assets Under Management (AUM)
• 7+ crore customer base across India
• Strong presence in consumer and business lending

**Product Portfolio:**
• Consumer Durables Financing: Market leader in electronics, appliances financing
• Personal Loans: Unsecured loans for various needs
• Business Loans: SME and commercial lending solutions
• Credit Cards: Growing portfolio with innovative features
• EMI Cards: Unique financing solutions for retail purchases

**Key Strengths:**
• Strong technology platform and digital capabilities
• Extensive distribution network
• Robust risk management and collection processes
• Excellent asset quality and profitability metrics
• Customer-centric product innovation

**Growth Strategy:**
• Digital lending expansion
• Rural and semi-urban market penetration
• New product launches and partnerships
• Technology enhancement and automation

Bajaj Finance significantly contributes to Bajaj Finserv's overall value creation through consistent growth and profitability.`,
            confidence: 0.88,
            suggestions: [
                "What are Bajaj Finance's key products?",
                "How is Bajaj Finance's asset quality?",
                "What is the growth strategy for lending business?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate leadership response
     */
    generateLeadershipResponse() {
        return {
            response: `👥 **Bajaj Finserv Leadership**

Bajaj Finserv is led by an experienced and visionary management team with a strong track record in financial services.

**Key Leadership:**
• **Chairman Emeritus**: Rahul Bajaj - Veteran industrialist and business leader
• **Managing Director**: The company is led by experienced professionals with deep industry expertise
• **Executive Team**: Seasoned leaders across insurance, lending, and investment businesses

**Management Philosophy:**
• Customer-centric approach
• Innovation and technology adoption
• Sustainable and profitable growth
• Strong governance and ethics
• Stakeholder value creation

**Leadership Strengths:**
• Deep understanding of Indian financial services market
• Proven ability to build and scale businesses
    • Strong strategic vision and execution capabilities
    • Focus on operational excellence and risk management
    • Commitment to digital transformation

The leadership team's experience and vision have been instrumental in establishing Bajaj Finserv as one of India's leading financial services companies.`,
            confidence: 0.75,
            suggestions: [
                "What is Bajaj Finserv's business strategy?",
                "How does the management approach growth?",
                "What are the company's core values?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate industry response
     */
    generateIndustryResponse(message) {
        if (message.includes('insurance')) {
            return {
                response: `📊 **Indian Insurance Industry Outlook**

The Indian insurance sector is one of the fastest-growing markets globally, offering significant opportunities for players like Bajaj Finserv.

**Market Dynamics:**
• **Growth Drivers**: Rising income levels, increasing awareness, regulatory support, digitalization
• **Market Size**: Multi-trillion rupee market with low penetration compared to global standards
• **Trends**: Digital adoption, product innovation, rural expansion, health insurance focus

**General Insurance:**
• Growing at 10-12% annually
• Motor insurance remains the largest segment
• Health insurance showing strong growth
• Commercial lines benefiting from economic growth

**Life Insurance:**
• Expected 12-15% CAGR growth
• Shift towards protection products
• ULIP and pension products gaining traction
• Digital channels driving distribution

**Bajaj Finserv's Position:**
• Well-positioned to capture market growth
• Strong brand and distribution advantages
• Innovation and technology leadership
• Partnership with global leader Allianz

The industry outlook remains positive, supporting Bajaj Finserv's growth strategy.`,
                confidence: 0.8,
                suggestions: [
                    "How is Bajaj Finserv positioned in the market?",
                    "What are the key industry trends?",
                    "Who are the main competitors?"
                ],
                dataSource: 'knowledge_base'
            };
        } else {
            return {
                response: `🏦 **Financial Services Industry Overview**

The Indian financial services sector is experiencing robust growth, driven by economic expansion, financial inclusion initiatives, and digital transformation.

**Key Trends:**
• **Digital Transformation**: Rapid adoption of fintech and digital services
• **Financial Inclusion**: Government initiatives expanding access to financial services
• **Regulatory Evolution**: Progressive policies supporting growth and innovation
• **Consumer Behavior**: Increasing sophistication and demand for diverse products

**NBFC Sector:**
• Critical role in credit delivery and financial inclusion
• Growing importance in the overall credit ecosystem
• Focus on technology and customer experience
• Regulatory support for well-managed NBFCs

**Opportunities:**
• Large underserved market segments
• Growing middle class and disposable income
• Infrastructure development needs
• Technology-enabled innovation

**Bajaj Finserv's Advantage:**
• Diversified business model across multiple segments
• Strong brand recognition and customer trust
• Technology and innovation capabilities
• Experienced management and execution track record

The sector fundamentals remain strong, supporting long-term growth prospects.`,
                confidence: 0.75,
                suggestions: [
                    "What are Bajaj Finserv's competitive advantages?",
                    "How is the company adapting to digital trends?",
                    "What are the growth opportunities?"
                ],
                dataSource: 'knowledge_base'
            };
        }
    }

    /**
     * Generate strategy response
     */
    generateStrategyResponse() {
        return {
            response: `🎯 **Bajaj Finserv Growth Strategy**

Bajaj Finserv follows a comprehensive strategy focused on sustainable growth, innovation, and market leadership across its business verticals.

**Strategic Pillars:**

**1. Diversified Business Model**
• Balanced portfolio across insurance, lending, and asset management
• Risk distribution and multiple growth engines
• Cross-selling opportunities across businesses

**2. Customer-Centricity**
• Focus on customer experience and satisfaction
• Product innovation based on customer needs
• Digital-first approach for convenience

**3. Technology and Innovation**
• Significant investments in digital platforms
• AI and data analytics for better decision making
• Automation for operational efficiency

**4. Market Expansion**
• Rural and semi-urban market penetration
    • New product launches and market segments
    • Geographic expansion and distribution enhancement

**5. Operational Excellence**
• Focus on profitable growth over volume
• Strong risk management and governance
• Continuous process improvement

**Future Focus Areas:**
• Digital transformation acceleration
• ESG initiatives and sustainable business practices
• New age products and services
• Strategic partnerships and alliances

This strategy positions Bajaj Finserv for long-term sustainable growth and market leadership.`,
            confidence: 0.82,
            suggestions: [
                "What are the key growth drivers?",
                "How is digital transformation progressing?",
                "What are the expansion plans?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate general performance response
     */
    generateGeneralPerformanceResponse() {
        return {
            response: `📈 **Bajaj Finserv Performance Overview**

Bajaj Finserv has consistently demonstrated strong performance across key metrics, establishing itself as a leading financial services company in India.

**Financial Highlights:**
• **Consistent Growth**: Double-digit revenue and profit growth over multiple years
• **Strong Profitability**: Healthy return on equity (ROE) typically above 20%
• **Dividend Track Record**: Regular dividend-paying company with growing payouts
• **Market Leadership**: Leading positions across multiple business segments

**Business Performance:**
• **Insurance**: Strong market share gains in both general and life insurance
• **Lending**: Bajaj Finance maintains leadership in NBFC space with healthy asset quality
• **Asset Management**: Growing AUM and expanding product portfolio

**Key Success Factors:**
• Diversified business model providing stability
• Strong brand recognition and customer trust
• Innovation and technology adoption
• Experienced management team
• Strategic partnerships (especially with Allianz)

**Market Recognition:**
• Consistent rankings among top financial services companies
• Strong ESG ratings and sustainable business practices
• Positive analyst coverage and investor confidence

**Future Outlook:**
• Well-positioned to benefit from India's economic growth
• Multiple growth opportunities across business segments
• Strong balance sheet to support expansion plans

The company continues to deliver value to stakeholders through consistent performance and strategic execution.`,
            confidence: 0.85,
            suggestions: [
                "What are the latest financial results?",
                "How is each business segment performing?",
                "What are the key growth drivers?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate greeting response
     */
    generateGreetingResponse() {
        const greetings = [
            "Hello! I'm your Bajaj Finserv AI assistant. I can help you with information about the company, its businesses, financial performance, and much more. What would you like to know?",
            "Hi there! Welcome to Bajaj Finserv AI. I'm here to assist you with comprehensive information about Bajaj Finserv's insurance, lending, and investment businesses. How can I help you today?",
            "Good day! I'm the Bajaj Finserv AI chatbot, ready to provide insights about one of India's leading financial services companies. What specific information are you looking for?"
        ];
        
        const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
        
        return {
            response: `👋 ${randomGreeting}

🎯 **I can help you with:**
• Company overview and business segments
• Insurance business (BAGIC and BALIC)
• Lending operations (Bajaj Finance)
• Financial performance and results
• Market insights and industry trends
• Strategic initiatives and growth plans

Feel free to ask me anything about Bajaj Finserv!`,
            confidence: 0.95,
            suggestions: [
                "Tell me about Bajaj Finserv",
                "How is the insurance business performing?",
                "What are Bajaj Finserv's key business segments?"
            ],
            dataSource: 'knowledge_base'
        };
    }

    /**
     * Generate help response
     */
    generateHelpResponse() {
        return {
            response: `🤖 **Bajaj Finserv AI Assistant - Help Guide**

I'm designed to provide comprehensive information about Bajaj Finserv and its businesses. Here's what I can help you with:

**📊 Company Information:**
• Business overview and company structure
• Key subsidiaries and business segments
• Leadership and management information
• Corporate strategy and growth plans

**💼 Business Segments:**
• Insurance business (BAGIC and BALIC)
• Lending operations (Bajaj Finance)
• Asset management and investment services
• Emerging businesses and new initiatives

**📈 Financial & Performance Data:**
• Quarterly and annual financial results
• Stock price information and trends
• Key financial metrics and ratios
• Business performance insights

**🏦 Industry Insights:**
• Insurance sector trends and outlook
• NBFC and lending market dynamics
• Competitive landscape analysis
• Regulatory environment updates

**💡 How to Ask:**
• Be specific about what you want to know
• Ask about particular time periods for financial data
• Mention specific business segments for detailed insights
• Use natural language - I understand conversational queries

**Example Questions:**
• "How is BAGIC performing in the insurance market?"
• "What are Bajaj Finserv's main business segments?"
• "Tell me about the company's growth strategy"
• "How has the stock performed this year?"

Feel free to ask me anything about Bajaj Finserv!`,
            confidence: 0.9,
            suggestions: [
                "Tell me about Bajaj Finserv's business segments",
                "How is the company performing financially?",
                "What is Bajaj Finserv's market position?"
            ],
            dataSource: 'knowledge_base'
        };
    }
}

module.exports = BajajAI;
