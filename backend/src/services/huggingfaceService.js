// const { HfInference } = require('@huggingface/inference');

// // Initialize with API key for better performance
// const hf = new HfInference(process.env.HUGGINGFACE_API_KEY);

// /**
//  * Generate interview questions WITH correct answers
//  * Using FREE Hugging Face models that actually work!
//  */
// async function generateQuestions(topic, level, count = 5) {
//   try {
//     const prompt = `You are an expert technical interviewer. Generate ${count} high-quality ${level}-level interview questions about "${topic}".

// For each question, provide a detailed model answer that demonstrates complete understanding.

// Return your response in this EXACT JSON format (no extra text):
// [
//   {
//     "question": "First interview question here?",
//     "correctAnswer": "Detailed, comprehensive model answer that covers all key points, includes examples, and demonstrates expert knowledge."
//   },
//   {
//     "question": "Second interview question here?",
//     "correctAnswer": "Another detailed model answer with specific details, practical examples, and clear explanations."
//   }
// ]

// Requirements:
// - Questions must be relevant to ${topic}
// - Difficulty level: ${level}
// - Each question should test different aspects
// - Model answers should be comprehensive (3-5 sentences minimum)
// - Include practical examples in answers where applicable
// - Return ONLY valid JSON, no markdown formatting`;

//     console.log(`🤖 Requesting questions from Hugging Face...`);

//     // Using a working free model: Meta Llama 3.1 8B Instruct
//     const result = await hf.textGeneration({
//       model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
//       inputs: prompt,
//       parameters: {
//         max_new_tokens: 1500,
//         temperature: 0.7,
//         top_p: 0.95,
//         return_full_text: false,
//       }
//     });

//     console.log(`✅ Received response from Hugging Face`);

//     // Clean and parse response
//     let text = result.generated_text.trim();
    
//     // Remove markdown code blocks
//     text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
//     // Extract JSON array
//     const jsonMatch = text.match(/\[[\s\S]*\]/);
    
//     if (jsonMatch) {
//       const questionsWithAnswers = JSON.parse(jsonMatch[0]);
      
//       // Validate structure
//       const validQuestions = questionsWithAnswers
//         .filter(q => q.question && q.correctAnswer)
//         .slice(0, count);
      
//       if (validQuestions.length >= count) {
//         console.log(`✅ Successfully generated ${validQuestions.length} questions`);
//         return validQuestions;
//       }
//     }

//     throw new Error('Invalid response format');

//   } catch (error) {
//     console.error('❌ Question generation error:', error.message);
    
//     // Enhanced fallback questions based on topic
//     console.log('⚠️ Using enhanced fallback questions...');
    
//     return generateFallbackQuestions(topic, level, count);
//   }
// }

// /**
//  * Enhanced fallback questions generator
//  */
// function generateFallbackQuestions(topic, level, count = 5) {
//   const questionTemplates = {
//     'DSA': [
//       {
//         question: `Explain the time and space complexity of common sorting algorithms. Which would you choose for ${level.toLowerCase()}-scale data?`,
//         correctAnswer: `Common sorting algorithms have different complexities: Quick Sort (O(n log n) average, O(n²) worst), Merge Sort (O(n log n) guaranteed), Heap Sort (O(n log n)), and Bubble Sort (O(n²)). For ${level.toLowerCase()}-scale production systems, Quick Sort is often preferred for its cache efficiency, though Merge Sort guarantees O(n log n). The choice depends on data characteristics: nearly sorted data benefits from Insertion Sort, while guaranteed performance needs Merge Sort.`
//       },
//       {
//         question: `Describe the difference between BFS and DFS. When would you use each?`,
//         correctAnswer: `BFS (Breadth-First Search) explores level by level using a queue, finding shortest paths in unweighted graphs. DFS (Depth-First Search) explores as deep as possible using a stack or recursion. Use BFS for: shortest path problems, level-order traversals, and finding nearest neighbors. Use DFS for: detecting cycles, topological sorting, maze solving, and when memory is constrained. BFS uses O(V) space, while DFS uses O(h) where h is height.`
//       },
//       {
//         question: `What is dynamic programming? Provide an example problem and explain the approach.`,
//         correctAnswer: `Dynamic Programming (DP) solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation. Classic example: Fibonacci sequence. Naive recursion: O(2^n), DP solution: O(n). Key principles: 1) Optimal substructure (optimal solution contains optimal solutions to subproblems), 2) Overlapping subproblems (same subproblems solved multiple times). Approaches: top-down (memoization) or bottom-up (tabulation). DP is ideal for optimization problems like knapsack, longest common subsequence, and matrix chain multiplication.`
//       },
//       {
//         question: `Explain hash tables: how they work, collision resolution strategies, and time complexity.`,
//         correctAnswer: `Hash tables use a hash function to map keys to array indices, enabling O(1) average-case lookup, insertion, and deletion. Hash function should distribute keys uniformly. Collision resolution: 1) Chaining - store colliding elements in linked lists (Java's HashMap), 2) Open addressing - probe for next empty slot using linear/quadratic probing or double hashing. Load factor (n/m) affects performance; rehashing occurs when threshold exceeded. Real-world applications: database indexing, caching, symbol tables. Python's dict and Java's HashMap are hash table implementations.`
//       },
//       {
//         question: `Compare arrays vs linked lists. What are the trade-offs and use cases?`,
//         correctAnswer: `Arrays offer O(1) random access but fixed size and O(n) insertion/deletion (except at end). Linked lists provide O(1) insertion/deletion at known positions but O(n) access and extra memory for pointers. Use arrays when: frequent random access, known size, cache locality matters. Use linked lists when: frequent insertions/deletions, unknown size, implementing stacks/queues. Modern systems favor arrays for cache performance (spatial locality). Variants: dynamic arrays (ArrayList), doubly linked lists (bidirectional traversal), circular linked lists.`
//       }
//     ],
//     'DBMS': [
//       {
//         question: `Explain ACID properties in database transactions with real-world examples.`,
//         correctAnswer: `ACID ensures reliable database transactions: Atomicity - transaction fully completes or fully fails (bank transfer: both debit and credit occur or neither). Consistency - maintains database invariants (account balance never negative). Isolation - concurrent transactions don't interfere (read committed, repeatable read, serializable levels). Durability - committed changes persist after crashes (write-ahead logging). Example: e-commerce order processing needs ACID to ensure inventory, payment, and order records stay synchronized even during system failures.`
//       },
//       {
//         question: `What is normalization? Explain 1NF, 2NF, 3NF with examples.`,
//         correctAnswer: `Normalization eliminates redundancy and anomalies. 1NF: atomic values, no repeating groups (separate phone numbers into rows, not comma-separated). 2NF: 1NF + no partial dependencies (non-key attributes depend on entire primary key, not part of it). 3NF: 2NF + no transitive dependencies (non-key attributes depend only on primary key, not other non-key attributes). Example: Student table with course info violates 3NF if course description depends on course_id, not student_id. Split into Student and Course tables.`
//       },
//       {
//         question: `Describe different types of database indexes and when to use each.`,
//         correctAnswer: `B-tree indexes: default, good for range queries and equality (ORDER BY, WHERE). Hash indexes: fast equality lookups, no range queries. Bitmap indexes: low-cardinality columns (gender, status), data warehousing. Full-text indexes: text search capabilities. Covering indexes: include all query columns, avoid table lookups. Clustered index: determines physical row order (one per table). Non-clustered: separate structure pointing to rows. Use indexes for frequently queried columns but consider write overhead and storage cost.`
//       },
//       {
//         question: `Explain the difference between SQL joins: INNER, LEFT, RIGHT, FULL OUTER.`,
//         correctAnswer: `INNER JOIN: returns only matching rows from both tables (employees with departments). LEFT JOIN: all rows from left table, matched rows from right, NULLs for non-matches (all employees, including those without departments). RIGHT JOIN: opposite of LEFT. FULL OUTER JOIN: all rows from both tables, NULLs where no match (all employees and departments, showing unassigned ones). CROSS JOIN: Cartesian product. Self-join: table joined with itself. Choose based on whether you need unmatched rows and from which table(s).`
//       },
//       {
//         question: `What are database transactions isolation levels? Explain with concurrency issues they prevent.`,
//         correctAnswer: `Isolation levels balance consistency vs performance: READ UNCOMMITTED (dirty reads possible), READ COMMITTED (prevents dirty reads, default in many DBs), REPEATABLE READ (prevents non-repeatable reads, MySQL default), SERIALIZABLE (full isolation, prevents phantom reads). Concurrency issues: Dirty read (reading uncommitted changes), Non-repeatable read (same query returns different results), Phantom read (new rows appear). Higher isolation = more locking = less concurrency. Choose based on application needs: financial systems need SERIALIZABLE, analytics might use READ COMMITTED.`
//       }
//     ],
//     'OS': [
//       {
//         question: `Explain process vs thread. What are the advantages of multithreading?`,
//         correctAnswer: `Process: independent program with separate memory space, heavyweight, inter-process communication needed. Thread: lightweight execution unit within process, shares memory space. Advantages of multithreading: 1) Resource sharing (efficient memory use), 2) Responsiveness (UI remains active), 3) Scalability (utilize multiple cores), 4) Economy (cheaper than processes). Context switching between threads is faster than processes. Example: web browser uses threads for rendering, JavaScript execution, and network requests. Thread safety requires synchronization mechanisms.`
//       },
//       {
//         question: `What is deadlock? Explain the four necessary conditions and prevention strategies.`,
//         correctAnswer: `Deadlock: two or more processes waiting indefinitely for resources held by each other. Four necessary conditions: 1) Mutual exclusion (resource non-shareable), 2) Hold and wait (holding resources while requesting more), 3) No preemption (resources can't be forcibly taken), 4) Circular wait (circular chain of waiting). Prevention: break one condition - allow preemption, request all resources at once, order resources. Detection: resource allocation graph, recovery by process termination or rollback. Avoidance: Banker's algorithm. Real example: Database transaction locks on multiple tables.`
//       },
//       {
//         question: `Describe virtual memory and paging. Why is it important?`,
//         correctAnswer: `Virtual memory: abstraction allowing processes to use more memory than physically available by using disk storage. Paging divides memory into fixed-size pages, swapping between RAM and disk. Benefits: 1) Process isolation (separate address spaces), 2) Efficient memory use (only active pages in RAM), 3) Larger programs than RAM, 4) Simplified memory management. Page faults occur when accessing page not in RAM. TLB (Translation Lookaside Buffer) caches page table entries for performance. Thrashing occurs when excessive paging degrades performance.`
//       },
//       {
//         question: `Compare different CPU scheduling algorithms: FCFS, SJF, Round Robin, Priority.`,
//         correctAnswer: `FCFS (First-Come-First-Served): simple, non-preemptive, convoy effect (short processes wait for long ones). SJF (Shortest Job First): optimal average waiting time, requires prediction, starvation risk. Round Robin: preemptive, fair, time quantum critical (too small = overhead, too large = FCFS). Priority: can cause starvation (solution: aging). Real systems use multilevel feedback queues combining approaches. Context switching overhead matters. Interactive systems need responsiveness (Round Robin), batch systems optimize throughput (SJF).`
//       },
//       {
//         question: `Explain different memory allocation strategies: First Fit, Best Fit, Worst Fit.`,
//         correctAnswer: `Memory allocation strategies for variable-sized partitions: First Fit - allocate first adequate block (fast, may cause small fragments at beginning). Best Fit - allocate smallest adequate block (minimizes waste, slow search, creates tiny unusable fragments). Worst Fit - allocate largest block (leaves larger fragments for future use, poor memory utilization). External fragmentation problem: use compaction or paging. Modern systems use paging/segmentation rather than contiguous allocation. Buddy system combines benefits. Slab allocation used in kernel for objects.`
//       }
//     ],
//     'React': [
//       {
//         question: `Explain React hooks: useState, useEffect, useContext. When and why to use each?`,
//         correctAnswer: `useState: manages component state, returns [value, setter], triggers re-renders. Use for: form inputs, toggles, counters. useEffect: handles side effects (API calls, subscriptions, DOM manipulation), runs after render. Dependencies array controls when it runs. Cleanup function prevents memory leaks. useContext: accesses context without prop drilling. Use for: theme, auth, language settings. Example: useState for form state, useEffect for fetching data on mount, useContext for global user data. Hooks enable functional components to have state and lifecycle features.`
//       },
//       {
//         question: `What is Virtual DOM? How does React reconciliation work?`,
//         correctAnswer: `Virtual DOM: lightweight JavaScript representation of actual DOM. React maintains two Virtual DOMs: current and updated. Reconciliation: diffing algorithm compares them, calculates minimal changes needed. Process: 1) State changes, 2) New Virtual DOM created, 3) Diff with old Virtual DOM, 4) Batch updates to real DOM. Optimizations: keys help identify elements, same component type = update not replace, different type = unmount and mount new. This makes React fast despite seeming inefficient to rebuild entire tree. Real DOM manipulation is expensive; Virtual DOM minimizes it.`
//       },
//       {
//         question: `Describe React component lifecycle methods and their modern hook equivalents.`,
//         correctAnswer: `Class component lifecycle: Mounting (constructor, render, componentDidMount), Updating (render, componentDidUpdate), Unmounting (componentWillUnmount). Hook equivalents: useEffect(() => {...}, []) = componentDidMount, useEffect(() => {...}) = componentDidUpdate, useEffect(() => { return () => {...} }, []) = componentWillUnmount. useLayoutEffect for synchronous DOM measurements. getDerivedStateFromProps → useMemo/useEffect. shouldComponentUpdate → React.memo. Modern React favors hooks for simpler, reusable logic without hierarchy issues.`
//       },
//       {
//         question: `What are controlled vs uncontrolled components in React? When to use each?`,
//         correctAnswer: `Controlled: form data handled by React state, single source of truth, value and onChange props. Provides validation, dynamic disabling, programmatic changes. Example: <input value={state} onChange={e => setState(e.target.value)} />. Uncontrolled: DOM handles data, use refs to access values, simpler for basic forms. Example: <input ref={inputRef} />. Use controlled when: validation needed, dependent fields, dynamic behavior. Use uncontrolled when: simple forms, file inputs (always uncontrolled), integrating non-React code. Most React apps use controlled for predictability.`
//       },
//       {
//         question: `Explain React performance optimization techniques.`,
//         correctAnswer: `Key techniques: 1) React.memo - prevents unnecessary re-renders of functional components by memoizing result. 2) useMemo - memoizes expensive calculations. 3) useCallback - memoizes functions to prevent recreation. 4) Code splitting - React.lazy() and Suspense for dynamic imports. 5) Virtualization - render only visible items in long lists (react-window). 6) Keys - stable, unique keys for list items. 7) Avoid inline functions/objects in JSX. 8) Production build minimizes size. 9) Profiler API identifies bottlenecks. Measure before optimizing - premature optimization wastes time.`
//       }
//     ],
//     'CN': [
//       {
//         question: `Explain the OSI model and its seven layers with real-world examples.`,
//         correctAnswer: `OSI Model has 7 layers: Physical (cables, signals), Data Link (MAC addresses, switches), Network (IP addressing, routers), Transport (TCP/UDP, ports), Session (authentication, connections), Presentation (encryption, compression), Application (HTTP, FTP, SMTP). Example: Email sending - Application (SMTP), Presentation (encrypt message), Session (establish connection), Transport (TCP segments), Network (IP routing), Data Link (Ethernet frames), Physical (electrical signals). Each layer adds headers. Understanding helps troubleshoot network issues at specific layers.`
//       },
//       {
//         question: `What is the difference between TCP and UDP? When would you use each?`,
//         correctAnswer: `TCP (Transmission Control Protocol): connection-oriented, reliable, ordered delivery, flow control, error checking, slower. Uses 3-way handshake. UDP (User Datagram Protocol): connectionless, unreliable, no ordering, faster, lower overhead. Use TCP for: web browsing (HTTP/HTTPS), email (SMTP), file transfer (FTP), where reliability matters. Use UDP for: video streaming, online gaming, VoIP, DNS queries, where speed matters more than perfect delivery. TCP ensures all packets arrive; UDP doesn't guarantee delivery but is faster.`
//       },
//       {
//         question: `Describe how DNS works and the DNS resolution process.`,
//         correctAnswer: `DNS (Domain Name System) translates domain names to IP addresses. Process: 1) User enters URL, 2) Browser checks cache, 3) If not found, queries recursive DNS resolver, 4) Resolver checks root nameserver, 5) Root directs to TLD nameserver (.com), 6) TLD directs to authoritative nameserver, 7) Authoritative returns IP address, 8) Resolver caches and returns to browser. Types: A record (IPv4), AAAA (IPv6), CNAME (alias), MX (mail server), NS (nameserver). TTL controls cache duration. DNS uses UDP port 53 for queries.`
//       },
//       {
//         question: `Explain IP addressing: IPv4 vs IPv6, subnetting, and CIDR notation.`,
//         correctAnswer: `IPv4: 32-bit addresses (4 billion), written as 192.168.1.1, running out of addresses. IPv6: 128-bit addresses (340 undecillion), written as 2001:0db8::1, future-proof. Subnetting divides networks into smaller segments for organization and security. CIDR notation: 192.168.1.0/24 means first 24 bits are network, last 8 bits are host (256 addresses). /24 = 255.255.255.0 subnet mask. Private ranges: 10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16. NAT translates private to public IPs.`
//       },
//       {
//         question: `What is HTTP/HTTPS? Explain the request-response cycle and status codes.`,
//         correctAnswer: `HTTP (HyperText Transfer Protocol): application layer protocol for web communication. HTTPS adds TLS/SSL encryption for security. Request-response cycle: 1) Client sends HTTP request (GET, POST, PUT, DELETE), 2) Server processes request, 3) Server sends HTTP response with status code and data. Status codes: 1xx (informational), 2xx (success - 200 OK), 3xx (redirection - 301 Moved), 4xx (client error - 404 Not Found), 5xx (server error - 500 Internal Error). Headers contain metadata. HTTP/2 and HTTP/3 improve performance with multiplexing and QUIC.`
//       }
//     ],
//     'HR': [
//       {
//         question: `Tell me about yourself and your background.`,
//         correctAnswer: `A strong answer follows the present-past-future structure: Start with current role/situation and key strengths. Briefly mention past experiences that led to current position, highlighting 2-3 relevant achievements. Conclude with future goals and why you're interested in this opportunity. Keep it concise (2-3 minutes), relevant to the role, and professional. Example: "I'm currently a software engineer specializing in React, with 3 years building scalable web applications. Previously, I led a team that increased user engagement by 40% through performance optimizations. I'm excited about this role because it combines my frontend expertise with opportunities to learn cloud architecture."`
//       },
//       {
//         question: `What are your greatest strengths and weaknesses?`,
//         correctAnswer: `Strengths: Choose 2-3 relevant to the role, provide specific examples. "My key strength is problem-solving - I recently debugged a critical production issue by systematically analyzing logs, saving the company $50K in potential losses." Weaknesses: Be honest but strategic. Choose a real weakness, explain what you're doing to improve. "I sometimes focus too much on perfection, which can slow me down. I've learned to set deadlines, get feedback early, and iterate rather than over-polish initially. This has improved my delivery speed by 30%." Avoid clichés like "I work too hard."`
//       },
//       {
//         question: `Describe a challenging situation and how you handled it.`,
//         correctAnswer: `Use STAR method: Situation (set context), Task (your responsibility), Action (specific steps you took), Result (measurable outcome). Example: "Situation: Our main database crashed 2 hours before a major product launch. Task: As lead engineer, I needed to restore service quickly. Action: I assembled the team, identified the corrupted index causing the crash, implemented a temporary fix while deploying a backup database in parallel, communicated updates to stakeholders every 15 minutes. Result: We restored service in 90 minutes, launched only 30 minutes late, and prevented $100K in lost revenue. I later implemented monitoring to prevent similar issues."`
//       },
//       {
//         question: `Why do you want to work for our company?`,
//         correctAnswer: `Research the company and personalize your answer. Structure: 1) Company mission/values alignment, 2) Specific products/projects that excite you, 3) Growth opportunities, 4) How you can contribute. Example: "I'm impressed by your commitment to sustainable technology - it aligns with my personal values. Your recent AI-powered climate prediction tool is exactly the kind of impactful work I want to contribute to. I've followed your engineering blog and love your culture of innovation and continuous learning. With my background in machine learning and cloud infrastructure, I believe I can help scale your prediction models while learning from your talented team."`
//       },
//       {
//         question: `Where do you see yourself in 5 years?`,
//         correctAnswer: `Show ambition but stay realistic and relevant to the role. Focus on skill development and contributions rather than specific titles. Example: "In 5 years, I see myself as a technical expert in cloud architecture, having led several major projects from conception to production. I'd like to mentor junior engineers and contribute to architectural decisions that shape the company's technical direction. Long-term, I'm interested in combining deep technical expertise with strategic planning, perhaps moving into a principal engineer or engineering manager role. Most importantly, I want to be somewhere I'm continuously learning and making meaningful impact - which is why this opportunity excites me."`
//       }
//     ]
//   };

//   // Get templates for the topic, fallback to generic if not found
//   const templates = questionTemplates[topic] || questionTemplates['DSA'];
  
//   return templates.slice(0, count);
// }

// /**
//  * Evaluate answer using Hugging Face AI
//  */
// async function evaluateAnswer(question, answer, correctAnswer) {
//   try {
//     const prompt = `You are an expert technical interviewer evaluating a candidate's answer.

// Question: ${question}

// Candidate's Answer: ${answer}

// Model Answer: ${correctAnswer}

// Evaluate the candidate's answer and provide:
// 1. A score from 1-10 (be fair but rigorous)
// 2. Constructive feedback highlighting strengths and areas for improvement

// Return ONLY valid JSON in this format:
// {
//   "score": 7,
//   "feedback": "Your answer demonstrates understanding of the core concept. You correctly identified X and Y. To improve, consider adding examples of Z and explaining the trade-offs involved. The explanation would benefit from more technical depth regarding implementation details."
// }`;

//     console.log(`🤖 Requesting evaluation from Hugging Face...`);

//     const result = await hf.textGeneration({
//       model: 'meta-llama/Meta-Llama-3.1-8B-Instruct',
//       inputs: prompt,
//       parameters: {
//         max_new_tokens: 500,
//         temperature: 0.5,
//         top_p: 0.9,
//         return_full_text: false,
//       }
//     });

//     console.log(`✅ Received evaluation from Hugging Face`);

//     // Clean and parse response
//     let text = result.generated_text.trim();
    
//     // Remove markdown
//     text = text.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    
//     // Extract JSON
//     const jsonMatch = text.match(/\{[\s\S]*\}/);
    
//     if (jsonMatch) {
//       const evaluation = JSON.parse(jsonMatch[0]);
      
//       // Validate and normalize score
//       if (evaluation.score) {
//         evaluation.score = Math.max(1, Math.min(10, Math.round(evaluation.score)));
//       }
      
//       if (evaluation.feedback) {
//         console.log(`✅ Evaluation complete - Score: ${evaluation.score}/10`);
//         return evaluation;
//       }
//     }

//     throw new Error('Invalid evaluation response');

//   } catch (error) {
//     console.error('❌ Evaluation error:', error.message);
    
//     // Intelligent fallback based on answer length and keywords
//     return generateFallbackEvaluation(question, answer, correctAnswer);
//   }
// }

// /**
//  * Fallback evaluation with basic analysis
//  */
// function generateFallbackEvaluation(question, answer, correctAnswer) {
//   const answerLength = answer.trim().split(/\s+/).length;
//   const correctLength = correctAnswer.trim().split(/\s+/).length;
  
//   // Basic scoring heuristic
//   let score = 5;
  
//   if (answerLength > correctLength * 0.7) score += 2;
//   if (answerLength > correctLength * 0.4) score += 1;
//   if (answerLength < 10) score -= 2;
  
//   // Check for key terms from question
//   const questionWords = question.toLowerCase().split(/\s+/).filter(w => w.length > 4);
//   const answerLower = answer.toLowerCase();
//   const matchedTerms = questionWords.filter(w => answerLower.includes(w)).length;
  
//   if (matchedTerms > questionWords.length * 0.5) score += 1;
  
//   score = Math.max(1, Math.min(10, score));
  
//   const feedbackTemplates = {
//     high: "Good answer! You've covered the key points effectively. To further improve, consider adding more specific examples and diving deeper into the technical implementation details.",
//     medium: "Your answer shows understanding of the basic concepts. To strengthen it, expand on the practical applications and include specific examples. Consider exploring edge cases and trade-offs.",
//     low: "Your response touches on the topic but needs more depth. Try to include: specific technical details, real-world examples, and a more comprehensive explanation of the core concepts. Review the model answer for guidance."
//   };
  
//   const feedbackType = score >= 7 ? 'high' : score >= 4 ? 'medium' : 'low';
  
//   return {
//     score,
//     feedback: feedbackTemplates[feedbackType]
//   };
// }

// module.exports = {
//   generateQuestions,
//   evaluateAnswer
// };

// const { InferenceClient } = require("@huggingface/inference");
// const hf = new InferenceClient(process.env.HF_API_KEY);

// const generateQuestions = async (topic, level, count = 5) => {
//   const systemPrompt = `You are a technical interviewer. 
//   Generate ${count} interview questions for ${topic} at ${level} level.
//   Respond ONLY with a JSON array of objects. 
//   Example: [{"question": "text", "correctAnswer": "text"}]`;

//   const response = await hf.chatCompletion({
//     model: "meta-llama/Llama-3.1-8B-Instruct",
//     messages: [{ role: "system", content: systemPrompt }],
//     max_tokens: 1000,
//     temperature: 0.7,
//     // --- THIS IS THE FIX: EXPLICIT PROVIDER ---
//     provider: "novita", 
//   });

//   const content = response.choices[0].message.content;
//   const jsonMatch = content.match(/\[[\s\S]*\]/);
//   return JSON.parse(jsonMatch ? jsonMatch[0] : content);
// };

// const evaluateAnswer = async (question, userAnswer, correctAnswer) => {
//   const systemPrompt = `Evaluate this answer. Return ONLY JSON: {"score": number, "feedback": "string"}`;
//   const userMsg = `Question: ${question}\nUser: ${userAnswer}\nCorrect: ${correctAnswer}`;

//   const response = await hf.chatCompletion({
//     model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
//     messages: [
//       { role: "system", content: systemPrompt },
//       { role: "user", content: userMsg }
//     ],
//     max_tokens: 500,
//     // --- THIS IS THE FIX: EXPLICIT PROVIDER ---
//     provider: "novita",
//   });

//   const content = response.choices[0].message.content;
//   const jsonMatch = content.match(/\{[\s\S]*\}/);
//   return JSON.parse(jsonMatch ? jsonMatch[0] : content);
// };

// module.exports = { generateQuestions, evaluateAnswer };

const { InferenceClient } = require("@huggingface/inference");

const hf = new InferenceClient(process.env.HF_API_KEY);


const generateAIAnswer = async (questionText) => {
  const response = await hf.chatCompletion({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "system",
        content:
          "You are an expert interview coach. Explain clearly, include expectations and a sample answer if applicable."
      },
      {
        role: "user",
        content: questionText
      }
    ],
    max_tokens: 700,
    temperature: 0.4,
    provider: "novita", 
  });

  return response.choices[0].message.content;
};

const generateQuestions = async (topic, level, count = 5) => {
  const systemPrompt = `You are a technical interviewer.
Generate ${count} interview questions for ${topic} at ${level} level.
Respond ONLY with JSON array:
[{"question":"text","correctAnswer":"text"}]`;

  const response = await hf.chatCompletion({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [{ role: "system", content: systemPrompt }],
    max_tokens: 1000,
    temperature: 0.7,
    provider: "novita",
  });

  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\[[\s\S]*\]/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : content);
};

const evaluateAnswer = async (question, userAnswer, correctAnswer) => {
  const response = await hf.chatCompletion({
    model: "meta-llama/Meta-Llama-3.1-8B-Instruct",
    messages: [
      {
        role: "system",
        content: 'Return ONLY JSON: {"score":number,"feedback":"text"}'
      },
      {
        role: "user",
        content: `Q:${question}\nUser:${userAnswer}\nCorrect:${correctAnswer}`
      }
    ],
    max_tokens: 500,
    provider: "novita",
  });

  const content = response.choices[0].message.content;
  const jsonMatch = content.match(/\{[\s\S]*\}/);
  return JSON.parse(jsonMatch ? jsonMatch[0] : content);
};

module.exports = {
  generateQuestions,
  evaluateAnswer,
  generateAIAnswer,
};
