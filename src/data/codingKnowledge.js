// ═══════════════════════════════════════════════════════════
// FORGE KNOWLEDGE CORE — Complete Coding Reference Database
// All languages · All paradigms · All patterns · All systems
// ═══════════════════════════════════════════════════════════

export const AI_MODELS = [
  { id: 'claude_sonnet_4_6', name: 'Claude Sonnet', provider: 'Anthropic', tier: 'elite', color: 'neon-purple', specialty: 'Architecture & Complex Logic', tokens: '200K ctx' },
  { id: 'gpt_5', name: 'GPT-5', provider: 'OpenAI', tier: 'elite', color: 'neon-cyan', specialty: 'Reasoning & Code Gen', tokens: '128K ctx' },
  { id: 'gpt_5_4', name: 'GPT-5.4', provider: 'OpenAI', tier: 'elite', color: 'neon-cyan', specialty: 'Advanced Multimodal', tokens: '128K ctx' },
  { id: 'gemini_3_pro', name: 'Gemini 3 Pro', provider: 'Google', tier: 'elite', color: 'neon-pink', specialty: 'Web Search + Code', tokens: '1M ctx' },
  { id: 'gemini_3_1_pro', name: 'Gemini 3.1 Pro', provider: 'Google', tier: 'elite', color: 'neon-pink', specialty: 'Multimodal + Search', tokens: '1M ctx' },
  { id: 'claude_opus_4_6', name: 'Claude Opus', provider: 'Anthropic', tier: 'legendary', color: 'neon-purple', specialty: 'Deep Reasoning & Research', tokens: '200K ctx' },
  { id: 'gpt_5_mini', name: 'GPT-5 Mini', provider: 'OpenAI', tier: 'standard', color: 'neon-cyan', specialty: 'Fast & Efficient', tokens: '128K ctx' },
  { id: 'gemini_3_flash', name: 'Gemini Flash', provider: 'Google', tier: 'standard', color: 'neon-pink', specialty: 'Speed + Web Access', tokens: '1M ctx' },
];

export const LANGUAGES = [
  {
    id: 'javascript',
    name: 'JavaScript',
    emoji: '⚡',
    category: 'Web',
    paradigms: ['Imperative', 'Functional', 'OOP', 'Event-driven', 'Prototype-based'],
    level: 'Universal',
    xp: 9800,
    color: '#F7DF1E',
    description: 'The language of the web. Runs everywhere — browser, server, desktop, IoT.',
    useCases: ['Web frontends', 'Node.js backends', 'React/Vue/Angular apps', 'Browser extensions', 'Desktop (Electron)', 'Mobile (React Native)'],
    strengths: ['Ubiquitous', 'Huge ecosystem (npm)', 'Async/await', 'Prototypal flexibility', 'V8 JIT speed'],
    weaknesses: ['Dynamic typing bugs', 'Prototype confusion', 'Callback hell (pre-async)', 'Browser quirks'],
    snippet: `// Modern JavaScript — full feature demo
const forge = {
  // Destructuring + defaults
  build: async ({ target = 'web', lang = 'js', optimize = true } = {}) => {
    // Optional chaining + nullish coalescing  
    const config = globalConfig?.environments?.[target] ?? defaultConfig;
    
    // Array methods pipeline
    const tasks = ['lint', 'compile', 'bundle', 'minify']
      .filter(t => optimize || t !== 'minify')
      .map(t => ({ name: t, status: 'pending' }));
    
    // Promise.all for parallel execution
    const results = await Promise.all(
      tasks.map(async task => {
        try {
          const result = await runTask(task.name, config);
          return { ...task, status: 'done', result };
        } catch (err) {
          return { ...task, status: 'error', error: err.message };
        }
      })
    );
    
    // Generator for lazy iteration
    function* processResults(items) {
      for (const item of items) {
        if (item.status === 'done') yield item;
      }
    }
    
    return [...processResults(results)];
  }
};

// Class with private fields (ES2022)
class GameEngine {
  #entities = new Map();
  #running = false;
  
  constructor(config) {
    this.config = config;
    this.#init();
  }
  
  #init() {
    this.#running = true;
    requestAnimationFrame(this.#loop.bind(this));
  }
  
  #loop = (timestamp) => {
    if (!this.#running) return;
    this.#entities.forEach(entity => entity.update(timestamp));
    requestAnimationFrame(this.#loop);
  };
  
  addEntity(id, entity) {
    this.#entities.set(id, entity);
    return this;  // chainable
  }
}`,
    concepts: ['Closures', 'Prototypes', 'Event Loop', 'Promises', 'Generators', 'Proxies', 'WeakMaps', 'Symbol', 'Iterators', 'Decorators'],
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    emoji: '🔷',
    category: 'Web',
    paradigms: ['Typed', 'OOP', 'Functional', 'Structural typing'],
    level: 'Professional',
    xp: 9600,
    color: '#3178C6',
    description: 'JavaScript with superpowers. Catches bugs at compile time, scales to millions of lines.',
    useCases: ['Large-scale web apps', 'Enterprise backends', 'React/Angular apps', 'Library authoring', 'Full-stack (Next.js)'],
    strengths: ['Static typing', 'IDE autocomplete', 'Refactoring safety', 'Interfaces & generics', 'Structural typing'],
    weaknesses: ['Build step required', 'Complex generic types', 'Over-engineering temptation'],
    snippet: `// TypeScript — advanced type system showcase
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};

type Result<T, E = Error> = 
  | { success: true; data: T }
  | { success: false; error: E };

// Generic with constraints
async function fetchEntity<T extends { id: string }>(
  endpoint: string,
  transform?: (raw: unknown) => T
): Promise<Result<T>> {
  try {
    const res = await fetch(endpoint);
    const raw = await res.json();
    const data = transform ? transform(raw) : (raw as T);
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error as Error };
  }
}

// Discriminated union with exhaustive check
type GameEvent =
  | { type: 'PLAYER_MOVE'; dx: number; dy: number }
  | { type: 'PLAYER_ATTACK'; targetId: string; damage: number }
  | { type: 'LEVEL_COMPLETE'; score: number; time: number };

function handleEvent(event: GameEvent): string {
  switch (event.type) {
    case 'PLAYER_MOVE': return \`Moved \${event.dx},\${event.dy}\`;
    case 'PLAYER_ATTACK': return \`Attacked \${event.targetId}\`;
    case 'LEVEL_COMPLETE': return \`Score: \${event.score}\`;
    default: 
      const _exhaustive: never = event;
      return _exhaustive;
  }
}

// Conditional types + infer
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;
type FunctionReturn<T> = T extends (...args: any[]) => infer R ? R : never;`,
    concepts: ['Generics', 'Discriminated Unions', 'Mapped Types', 'Conditional Types', 'Decorators', 'Namespaces', 'Module augmentation', 'Template literal types'],
  },
  {
    id: 'python',
    name: 'Python',
    emoji: '🐍',
    category: 'AI/Systems',
    paradigms: ['Imperative', 'OOP', 'Functional', 'Scripting'],
    level: 'Universal',
    xp: 9900,
    color: '#3776AB',
    description: 'The #1 language for AI/ML, data science, scripting, and rapid prototyping.',
    useCases: ['AI/ML (TensorFlow, PyTorch)', 'Data science (Pandas, NumPy)', 'Web (Django, FastAPI)', 'Automation', 'Scientific computing'],
    strengths: ['Readable syntax', 'Vast scientific libs', 'Rapid prototyping', 'Strong AI ecosystem', 'Duck typing'],
    weaknesses: ['GIL threading limit', 'Slower than compiled langs', 'Packaging complexity', 'Version fragmentation'],
    snippet: `# Python — modern features showcase
from dataclasses import dataclass, field
from typing import TypeVar, Generic, Protocol
from functools import wraps, cache
import asyncio

T = TypeVar('T')

# Protocol (structural typing)
class Drawable(Protocol):
    def draw(self, surface) -> None: ...
    def get_bounds(self) -> tuple[int, int, int, int]: ...

# Dataclass with slots for performance
@dataclass(slots=True, frozen=True)
class Vector2:
    x: float
    y: float
    
    def __add__(self, other: 'Vector2') -> 'Vector2':
        return Vector2(self.x + other.x, self.y + other.y)
    
    def magnitude(self) -> float:
        return (self.x**2 + self.y**2) ** 0.5

# Generic stack
class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []
    
    def push(self, item: T) -> None:
        self._items.append(item)
    
    def pop(self) -> T:
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items.pop()

# Decorator with wraps
def retry(max_attempts: int = 3, delay: float = 1.0):
    def decorator(func):
        @wraps(func)
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    await asyncio.sleep(delay * (attempt + 1))
        return wrapper
    return decorator

# Context manager
class GameSession:
    def __enter__(self):
        self.start_time = asyncio.get_event_loop().time()
        return self
    
    def __exit__(self, *args):
        duration = asyncio.get_event_loop().time() - self.start_time
        print(f"Session: {duration:.2f}s")

# List comprehension + walrus operator
@cache
def fibonacci(n: int) -> int:
    return n if n < 2 else fibonacci(n-1) + fibonacci(n-2)

primes = [p for p in range(2, 1000) 
          if all(p % i != 0 for i in range(2, int(p**0.5) + 1))]`,
    concepts: ['Decorators', 'Generators', 'Context Managers', 'Metaclasses', 'Descriptors', 'Async/Await', 'GIL', 'Duck Typing', 'List Comprehensions', 'Slots'],
  },
  {
    id: 'rust',
    name: 'Rust',
    emoji: '⚙️',
    category: 'Systems',
    paradigms: ['Systems', 'Functional', 'OOP (trait-based)', 'Concurrent'],
    level: 'Expert',
    xp: 9200,
    color: '#CE422B',
    description: 'Memory-safe systems programming. No GC, no data races. The future of systems code.',
    useCases: ['Game engines', 'WebAssembly', 'OS kernels', 'Embedded', 'High-perf servers', 'Cryptography'],
    strengths: ['Memory safety without GC', 'Zero-cost abstractions', 'Fearless concurrency', 'WASM target', 'Performance'],
    weaknesses: ['Steep learning curve', 'Borrow checker friction', 'Long compile times', 'Smaller ecosystem than C++'],
    snippet: `// Rust — ownership, traits, async showcase
use std::sync::{Arc, Mutex};
use tokio::task;

// Trait with associated type
trait Component: Send + Sync {
    type Output;
    fn update(&mut self, delta: f32) -> Self::Output;
}

// Generic struct with lifetime
#[derive(Debug, Clone)]
struct EntityPool<T: Component> {
    entities: Vec<T>,
    active: usize,
}

impl<T: Component> EntityPool<T> {
    pub fn new(capacity: usize) -> Self {
        Self { entities: Vec::with_capacity(capacity), active: 0 }
    }
    
    pub fn spawn(&mut self, entity: T) -> usize {
        let id = self.entities.len();
        self.entities.push(entity);
        self.active += 1;
        id
    }
}

// Enum with pattern matching
#[derive(Debug)]
enum GameState {
    Loading { progress: f32 },
    Playing { level: u32, score: u64 },
    GameOver { final_score: u64, rank: String },
}

impl GameState {
    fn transition(&self, event: &str) -> Option<GameState> {
        match (self, event) {
            (Self::Loading { progress }, _) if *progress >= 1.0 => {
                Some(Self::Playing { level: 1, score: 0 })
            }
            (Self::Playing { score, .. }, "die") => {
                Some(Self::GameOver { 
                    final_score: *score, 
                    rank: Self::calc_rank(*score)
                })
            }
            _ => None,
        }
    }
    
    fn calc_rank(score: u64) -> String {
        match score {
            s if s > 100_000 => "S+".into(),
            s if s > 50_000  => "S".into(),
            s if s > 10_000  => "A".into(),
            _ => "B".into(),
        }
    }
}

// Async with Arc<Mutex>
async fn parallel_update(pool: Arc<Mutex<Vec<u64>>>) {
    let handles: Vec<_> = (0..8).map(|i| {
        let pool = Arc::clone(&pool);
        task::spawn(async move {
            let mut data = pool.lock().unwrap();
            data[i] *= 2;
        })
    }).collect();
    
    for h in handles { h.await.unwrap(); }
}`,
    concepts: ['Ownership', 'Borrowing', 'Lifetimes', 'Traits', 'Enums + Pattern Matching', 'Smart Pointers', 'Fearless Concurrency', 'WASM', 'Unsafe Rust', 'Macros'],
  },
  {
    id: 'cpp',
    name: 'C++',
    emoji: '🔩',
    category: 'Systems',
    paradigms: ['OOP', 'Generic', 'Functional', 'Systems', 'Imperative'],
    level: 'Expert',
    xp: 9500,
    color: '#00599C',
    description: 'Powers every major game engine. Unreal, Unity core, AAA games — all C++.',
    useCases: ['AAA Game engines (Unreal)', 'High-freq trading', 'OS development', 'Embedded systems', 'Compilers', 'Graphics engines'],
    strengths: ['Raw performance', 'RAII', 'Template metaprogramming', 'Zero overhead abstractions', 'Industry standard for games'],
    weaknesses: ['Memory management complexity', 'Undefined behavior', 'Build system chaos', 'Long compile times'],
    snippet: `// Modern C++20 — concepts, coroutines, ranges
#include <concepts>
#include <ranges>
#include <coroutine>
#include <span>

// Concept definition
template<typename T>
concept Numeric = std::integral<T> || std::floating_point<T>;

template<typename T>
concept Entity = requires(T e, float dt) {
    { e.update(dt) } -> std::same_as<void>;
    { e.get_id() } -> std::convertible_to<uint64_t>;
};

// CRTP for static polymorphism (zero virtual overhead)
template<typename Derived>
class Component {
public:
    void update(float dt) {
        static_cast<Derived*>(this)->do_update(dt);
    }
    auto get_bounds() const {
        return static_cast<const Derived*>(this)->do_get_bounds();
    }
};

// Ranges pipeline
auto get_visible_entities(auto& entities, const Frustum& frustum) {
    return entities
        | std::views::filter([&](const auto& e) { return e.is_active(); })
        | std::views::filter([&](const auto& e) { return frustum.contains(e.get_bounds()); })
        | std::views::transform([](const auto& e) { return e.get_id(); });
}

// Coroutine task
struct Task {
    struct promise_type {
        Task get_return_object() { return {}; }
        std::suspend_never initial_suspend() { return {}; }
        std::suspend_never final_suspend() noexcept { return {}; }
        void return_void() {}
        void unhandled_exception() {}
    };
};

Task load_level(std::string_view name) {
    co_await load_assets(name);
    co_await spawn_entities(name);
    co_await initialize_lighting(name);
}

// Smart pointer + RAII
class TextureManager {
    std::unordered_map<std::string, std::shared_ptr<Texture>> cache_;
public:
    std::shared_ptr<Texture> get(const std::string& path) {
        auto [it, inserted] = cache_.try_emplace(path);
        if (inserted) it->second = std::make_shared<Texture>(path);
        return it->second;
    }
};`,
    concepts: ['RAII', 'Templates', 'Move Semantics', 'Smart Pointers', 'Virtual Tables', 'CRTP', 'Concepts (C++20)', 'Coroutines', 'Ranges', 'Constexpr'],
  },
  {
    id: 'csharp',
    name: 'C#',
    emoji: '🎮',
    category: 'Game/Enterprise',
    paradigms: ['OOP', 'Functional', 'Async', 'Component-based'],
    level: 'Professional',
    xp: 9300,
    color: '#239120',
    description: 'Unity\'s primary language. Also powers massive enterprise apps and .NET services.',
    useCases: ['Unity game development', 'ASP.NET web APIs', 'Windows apps (WPF/MAUI)', 'Enterprise software', 'Blazor WebAssembly'],
    strengths: ['Unity integration', 'LINQ', 'async/await', 'Strong typing', 'Null safety (nullable refs)'],
    weaknesses: ['Windows-centric legacy', 'Verbose compared to Python', 'Unity GC pauses'],
    snippet: `// C# — Unity patterns + modern C# 12
using System;
using System.Linq;
using System.Threading.Tasks;
using UnityEngine;

// Unity MonoBehaviour component
public class PlayerController : MonoBehaviour
{
    [SerializeField] private float _speed = 5f;
    [SerializeField] private float _jumpForce = 8f;
    
    private Rigidbody2D _rb;
    private bool _isGrounded;
    
    // Property with backing field
    public int Score { get; private set; }
    
    private void Awake() => _rb = GetComponent<Rigidbody2D>();
    
    private void Update()
    {
        float input = Input.GetAxisRaw("Horizontal");
        _rb.velocity = new Vector2(input * _speed, _rb.velocity.y);
        
        if (Input.GetButtonDown("Jump") && _isGrounded)
            _rb.AddForce(Vector2.up * _jumpForce, ForceMode2D.Impulse);
    }
}

// LINQ + async/await
public static class DataService
{
    public static async Task<IEnumerable<PlayerRecord>> GetTopPlayers(
        int count = 10,
        CancellationToken ct = default)
    {
        var records = await FetchAllRecords(ct);
        
        return records
            .Where(r => r.IsActive && r.Score > 0)
            .OrderByDescending(r => r.Score)
            .ThenBy(r => r.Timestamp)
            .Take(count)
            .Select(r => r with { Rank = CalculateRank(r.Score) });
    }
}

// Record type (immutable data)
public record PlayerRecord(
    string Id,
    string Name, 
    long Score,
    DateTime Timestamp,
    bool IsActive,
    string Rank = "B"
);

// Pattern matching
static string DescribeEntity(object entity) => entity switch
{
    Player p when p.Score > 100_000 => $"Elite: {p.Name}",
    Enemy { IsBoss: true } e => $"Boss: {e.Name}",
    Projectile { Damage: > 50 } => "Heavy projectile",
    null => "Nothing",
    _ => "Unknown entity"
};`,
    concepts: ['LINQ', 'Async/Await', 'Delegates', 'Events', 'Generics', 'Pattern Matching', 'Records', 'Nullable Reference Types', 'Span<T>', 'Reflection'],
  },
  {
    id: 'go',
    name: 'Go',
    emoji: '🚀',
    category: 'Backend',
    paradigms: ['Concurrent', 'Imperative', 'Composition-over-inheritance'],
    level: 'Professional',
    xp: 8800,
    color: '#00ADD8',
    description: 'Google\'s language for cloud infrastructure. Simple, fast, built-in concurrency.',
    useCases: ['Microservices', 'Cloud infrastructure', 'CLIs', 'High-perf APIs', 'Docker/Kubernetes (written in Go)'],
    strengths: ['Goroutines', 'Fast compilation', 'Simple syntax', 'Built-in testing', 'Static binary output'],
    weaknesses: ['No generics until 1.18', 'Error handling verbosity', 'No exceptions', 'Missing some FP features'],
    snippet: `// Go — goroutines, channels, interfaces
package main

import (
    "context"
    "sync"
    "time"
    "fmt"
)

// Interface composition
type Entity interface {
    Update(dt float64)
    ID() string
}

type Renderer interface {
    Draw(surface Surface)
    ZIndex() int
}

type VisibleEntity interface {
    Entity
    Renderer
}

// Worker pool with channels
func ProcessEntities(ctx context.Context, entities []Entity, workers int) <-chan Result {
    jobs := make(chan Entity, len(entities))
    results := make(chan Result, len(entities))
    
    var wg sync.WaitGroup
    
    // Spawn workers
    for i := 0; i < workers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for entity := range jobs {
                select {
                case <-ctx.Done():
                    return
                default:
                    results <- processOne(entity)
                }
            }
        }()
    }
    
    // Send jobs
    go func() {
        for _, e := range entities {
            jobs <- e
        }
        close(jobs)
        wg.Wait()
        close(results)
    }()
    
    return results
}

// Error handling with custom type
type GameError struct {
    Code    int
    Message string
    Cause   error
}

func (e *GameError) Error() string {
    return fmt.Sprintf("[%d] %s: %v", e.Code, e.Message, e.Cause)
}

func (e *GameError) Unwrap() error { return e.Cause }

// Context with timeout
func LoadLevel(name string) error {
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()
    
    return loadWithContext(ctx, name)
}`,
    concepts: ['Goroutines', 'Channels', 'Select', 'Interfaces', 'Defer', 'Panic/Recover', 'Generics (1.18+)', 'Context', 'sync.WaitGroup', 'Embedding'],
  },
  {
    id: 'java',
    name: 'Java',
    emoji: '☕',
    category: 'Enterprise',
    paradigms: ['OOP', 'Functional (Java 8+)', 'Concurrent'],
    level: 'Universal',
    xp: 9100,
    color: '#ED8B00',
    description: 'Write once run anywhere. Dominates enterprise, Android, and large-scale backend systems.',
    useCases: ['Android development', 'Enterprise backends', 'Spring Boot APIs', 'Minecraft modding', 'Big data (Hadoop/Spark)'],
    strengths: ['JVM ecosystem', 'Strong typing', 'Mature tooling', 'Streams API', 'Excellent concurrency'],
    weaknesses: ['Verbosity', 'Memory overhead', 'Slower startup than Go/Rust', 'Boilerplate'],
    snippet: `// Java 21 — records, sealed classes, virtual threads
import java.util.concurrent.*;
import java.util.stream.*;

// Sealed class hierarchy
public sealed interface GameEvent 
    permits PlayerMoved, AttackLanded, LevelComplete {
}

public record PlayerMoved(String playerId, double dx, double dy) 
    implements GameEvent {}
    
public record AttackLanded(String attackerId, String targetId, int damage)
    implements GameEvent {}
    
public record LevelComplete(int level, long score, Duration time)
    implements GameEvent {}

// Pattern matching switch (Java 21)
String describe(GameEvent event) {
    return switch (event) {
        case PlayerMoved(var id, var dx, var dy) -> 
            "Player %s moved (%.1f, %.1f)".formatted(id, dx, dy);
        case AttackLanded(var atk, var tgt, var dmg) when dmg > 100 -> 
            "CRITICAL HIT: %d damage".formatted(dmg);
        case AttackLanded(_, _, var dmg) -> 
            "Hit for %d".formatted(dmg);
        case LevelComplete(var lvl, var score, _) -> 
            "Level %d complete! Score: %d".formatted(lvl, score);
    };
}

// Virtual threads (Project Loom - Java 21)
void handleMassiveLoad(List<GameRequest> requests) throws Exception {
    try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
        var futures = requests.stream()
            .map(req -> executor.submit(() -> processRequest(req)))
            .toList();
        
        // Stream API
        var results = futures.stream()
            .map(f -> {
                try { return f.get(); }
                catch (Exception e) { return null; }
            })
            .filter(Objects::nonNull)
            .collect(Collectors.groupingBy(Result::status, Collectors.counting()));
    }
}`,
    concepts: ['JVM', 'Generics', 'Streams API', 'Virtual Threads', 'Records', 'Sealed Classes', 'Pattern Matching', 'Reflection', 'Annotations', 'CompletableFuture'],
  },
  {
    id: 'kotlin',
    name: 'Kotlin',
    emoji: '🎯',
    category: 'Mobile',
    paradigms: ['OOP', 'Functional', 'Coroutines', 'Null-safe'],
    level: 'Professional',
    xp: 8700,
    color: '#7F52FF',
    description: 'Modern Java. Google\'s preferred Android language. Null-safe, concise, coroutine-native.',
    useCases: ['Android apps', 'Kotlin Multiplatform (iOS too)', 'Spring Boot', 'Compose UI', 'Server-side'],
    strengths: ['Null safety', 'Coroutines', 'Extension functions', 'Data classes', 'Smart casts', 'Multiplatform'],
    weaknesses: ['Slower compile than Java', 'JVM startup time', 'Complex when/match readability'],
    snippet: `// Kotlin — coroutines, sealed classes, extensions
import kotlinx.coroutines.*
import kotlinx.coroutines.flow.*

// Sealed class with data
sealed class GameState {
    data class Playing(val level: Int, val score: Long) : GameState()
    data class Paused(val reason: String) : GameState()
    data object GameOver : GameState()
    data object Loading : GameState()
}

// Extension functions
fun GameState.Playing.addScore(points: Long) = 
    copy(score = score + points)

val GameState.isActive: Boolean
    get() = this is GameState.Playing

// Coroutine Flow for reactive updates
class GameRepository {
    private val _state = MutableStateFlow<GameState>(GameState.Loading)
    val state: StateFlow<GameState> = _state.asStateFlow()
    
    suspend fun startGame() = coroutineScope {
        _state.value = GameState.Playing(level = 1, score = 0)
        
        // Parallel async operations
        val (assets, config) = awaitAll(
            async { loadAssets() },
            async { loadConfig() }
        )
        
        // Flow transformation pipeline
        entityUpdates
            .filter { it.isSignificant }
            .debounce(16L)
            .map { update -> processUpdate(update) }
            .catch { emit(ErrorEvent(it)) }
            .collect { event -> handleEvent(event) }
    }
}

// Scope functions
data class Player(val name: String, var health: Int, var score: Long)

fun createPlayer(name: String) = Player(name, 100, 0).apply {
    health = calculateStartHealth(name)
}.also { player ->
    registerPlayer(player)
    println("Created: \${player.name}")
}`,
    concepts: ['Coroutines', 'Flow', 'Null Safety', 'Extension Functions', 'Sealed Classes', 'Data Classes', 'Scope Functions', 'Delegation', 'Inline Functions', 'Multiplatform'],
  },
  {
    id: 'swift',
    name: 'Swift',
    emoji: '🍎',
    category: 'Mobile',
    paradigms: ['Protocol-oriented', 'OOP', 'Functional', 'Value types'],
    level: 'Professional',
    xp: 8600,
    color: '#FA7343',
    description: 'Apple\'s modern language. Protocol-oriented design, value semantics, memory safety.',
    useCases: ['iOS/macOS apps', 'SwiftUI', 'Server-side (Vapor)', 'App Clips', 'watchOS/tvOS'],
    strengths: ['Protocol-oriented', 'Value semantics', 'ARC memory mgmt', 'SwiftUI integration', 'Playgrounds'],
    weaknesses: ['Apple platform lock-in', 'ABI stability evolution', 'Smaller server ecosystem'],
    snippet: `// Swift — protocols, actors, async/await
import SwiftUI
import Combine

// Protocol with associated type
protocol GameComponent {
    associatedtype State: Hashable
    var state: State { get }
    mutating func update(deltaTime: TimeInterval)
}

// Actor for thread-safe state
actor GameSessionManager {
    private var activeSessions: [String: GameSession] = [:]
    private var playerCount: Int = 0
    
    func createSession(for playerId: String) async throws -> GameSession {
        guard playerCount < 100 else {
            throw GameError.serverFull
        }
        let session = GameSession(playerId: playerId)
        activeSessions[playerId] = session
        playerCount += 1
        return session
    }
    
    func endSession(for playerId: String) async {
        if activeSessions.removeValue(forKey: playerId) != nil {
            playerCount -= 1
        }
    }
}

// SwiftUI View with @Observable
@Observable class GameViewModel {
    var score: Int = 0
    var level: Int = 1
    var isGameOver: Bool = false
    
    func addScore(_ points: Int) {
        score += points
        if score > level * 1000 { level += 1 }
    }
}

struct GameHUD: View {
    @State private var vm = GameViewModel()
    
    var body: some View {
        HStack {
            Text("Score: \\(vm.score)")
                .font(.title2.bold())
            Spacer()
            Text("Level \\(vm.level)")
                .foregroundStyle(.cyan)
        }
        .padding()
        .background(.ultraThinMaterial)
    }
}

// Result builder (DSL)
@resultBuilder struct LevelBuilder {
    static func buildBlock(_ components: any Room...) -> [any Room] { components }
    static func buildIf(_ component: (any Room)?) -> any Room? { component }
}`,
    concepts: ['Protocols', 'Generics', 'Actors', 'Async/Await', 'Property Wrappers', 'Result Builders', 'Combine', 'Value vs Reference Types', 'ARC', 'Opaque Types'],
  },
  {
    id: 'glsl',
    name: 'GLSL / HLSL',
    emoji: '🎨',
    category: 'Graphics',
    paradigms: ['Shader', 'Parallel', 'GPU'],
    level: 'Specialist',
    xp: 7800,
    color: '#FF6B35',
    description: 'GPU shader languages. Write code that runs on thousands of cores simultaneously.',
    useCases: ['Vertex shaders', 'Fragment/pixel shaders', 'Compute shaders', 'Post-processing effects', 'PBR rendering'],
    strengths: ['Massively parallel', 'Direct GPU access', 'Real-time graphics', 'Hardware-accelerated math'],
    weaknesses: ['Complex debugging', 'No dynamic memory', 'Limited control flow', 'Platform differences'],
    snippet: `// GLSL — PBR fragment shader
#version 460 core

// GBuffer inputs
uniform sampler2D gPosition;
uniform sampler2D gNormal;
uniform sampler2D gAlbedoSpec;

// Lights
const int MAX_LIGHTS = 32;
uniform int numLights;
uniform vec3 lightPositions[MAX_LIGHTS];
uniform vec3 lightColors[MAX_LIGHTS];
uniform vec3 camPos;

in vec2 TexCoords;
out vec4 FragColor;

const float PI = 3.14159265359;

// PBR Distribution (GGX/Trowbridge-Reitz)
float DistributionGGX(vec3 N, vec3 H, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH = max(dot(N, H), 0.0);
    float denom = (NdotH * NdotH * (a2 - 1.0) + 1.0);
    return a2 / (PI * denom * denom);
}

// Schlick approximation for Fresnel
vec3 FresnelSchlick(float cosTheta, vec3 F0) {
    return F0 + (1.0 - F0) * pow(clamp(1.0 - cosTheta, 0.0, 1.0), 5.0);
}

void main() {
    vec3 FragPos = texture(gPosition, TexCoords).rgb;
    vec3 Normal  = normalize(texture(gNormal, TexCoords).rgb);
    vec3 Albedo  = pow(texture(gAlbedoSpec, TexCoords).rgb, vec3(2.2));
    float Metallic  = texture(gAlbedoSpec, TexCoords).a;
    float Roughness = texture(gPosition, TexCoords).a;
    float AO        = texture(gNormal, TexCoords).a;
    
    vec3 V = normalize(camPos - FragPos);
    vec3 F0 = mix(vec3(0.04), Albedo, Metallic);
    vec3 Lo = vec3(0.0);
    
    for(int i = 0; i < numLights; ++i) {
        vec3 L = normalize(lightPositions[i] - FragPos);
        vec3 H = normalize(V + L);
        float dist = length(lightPositions[i] - FragPos);
        float attenuation = 1.0 / (dist * dist);
        vec3 radiance = lightColors[i] * attenuation;
        
        float NDF = DistributionGGX(Normal, H, Roughness);
        vec3 F = FresnelSchlick(max(dot(H, V), 0.0), F0);
        
        vec3 numerator = NDF * F;
        float NdotV = max(dot(Normal, V), 0.0);
        float NdotL = max(dot(Normal, L), 0.0);
        float denominator = 4.0 * NdotV * NdotL + 0.0001;
        vec3 specular = numerator / denominator;
        
        Lo += (Albedo / PI + specular) * radiance * NdotL;
    }
    
    vec3 ambient = vec3(0.03) * Albedo * AO;
    vec3 color = ambient + Lo;
    color = color / (color + vec3(1.0));  // Reinhard tone mapping
    color = pow(color, vec3(1.0/2.2));   // Gamma correction
    
    FragColor = vec4(color, 1.0);
}`,
    concepts: ['Vertex Shaders', 'Fragment Shaders', 'Compute Shaders', 'Uniforms', 'Varyings', 'PBR', 'Shadow Mapping', 'Deferred Rendering', 'Post-processing', 'SSAO'],
  },
  {
    id: 'sql',
    name: 'SQL',
    emoji: '🗄️',
    category: 'Data',
    paradigms: ['Declarative', 'Set-based', 'Relational'],
    level: 'Universal',
    xp: 9000,
    color: '#336791',
    description: 'The universal data query language. 50+ years old and still irreplaceable.',
    useCases: ['Database queries', 'Analytics', 'Data warehousing', 'Reporting', 'ETL pipelines'],
    strengths: ['Declarative power', 'Set operations', 'ACID transactions', 'Universal standard', 'Window functions'],
    weaknesses: ['Impedance mismatch with OOP', 'Vendor dialect differences', 'Complex query optimization'],
    snippet: `-- Advanced SQL — CTEs, window functions, analytics
-- Game leaderboard with complex analytics

WITH player_stats AS (
    SELECT 
        p.id,
        p.username,
        p.region,
        SUM(s.score) as total_score,
        COUNT(DISTINCT s.game_id) as games_played,
        AVG(s.score) as avg_score,
        MAX(s.score) as best_score,
        MIN(s.created_at) as first_game
    FROM players p
    JOIN game_sessions s ON p.id = s.player_id
    WHERE s.created_at >= NOW() - INTERVAL '30 days'
    GROUP BY p.id, p.username, p.region
),
ranked_players AS (
    SELECT *,
        RANK() OVER (ORDER BY total_score DESC) as global_rank,
        RANK() OVER (PARTITION BY region ORDER BY total_score DESC) as region_rank,
        PERCENT_RANK() OVER (ORDER BY total_score DESC) as percentile,
        LAG(total_score, 1) OVER (
            PARTITION BY id ORDER BY first_game
        ) as prev_period_score,
        AVG(avg_score) OVER (
            PARTITION BY region 
            ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
        ) as rolling_region_avg
    FROM player_stats
),
achievements AS (
    SELECT DISTINCT player_id, 
        ARRAY_AGG(achievement_name ORDER BY earned_at) as earned
    FROM player_achievements
    GROUP BY player_id
)
SELECT 
    r.*,
    a.earned as achievements,
    CASE 
        WHEN r.percentile >= 0.99 THEN 'Legendary'
        WHEN r.percentile >= 0.95 THEN 'Diamond'
        WHEN r.percentile >= 0.80 THEN 'Platinum'
        WHEN r.percentile >= 0.60 THEN 'Gold'
        ELSE 'Silver'
    END as rank_tier,
    (r.total_score - COALESCE(r.prev_period_score, 0)) as score_delta
FROM ranked_players r
LEFT JOIN achievements a ON r.id = a.player_id
WHERE r.global_rank <= 100
ORDER BY r.global_rank;

-- Recursive CTE for skill trees
WITH RECURSIVE skill_tree AS (
    SELECT id, name, parent_id, 0 as depth, name::text as path
    FROM skills WHERE parent_id IS NULL
    UNION ALL
    SELECT s.id, s.name, s.parent_id, st.depth + 1, 
           st.path || ' > ' || s.name
    FROM skills s
    JOIN skill_tree st ON s.parent_id = st.id
)
SELECT * FROM skill_tree ORDER BY path;`,
    concepts: ['CTEs', 'Window Functions', 'Indexes', 'EXPLAIN ANALYZE', 'Transactions', 'Joins', 'Aggregations', 'Recursive CTEs', 'Partitioning', 'Full-Text Search'],
  },
  {
    id: 'lua',
    name: 'Lua',
    emoji: '🌙',
    category: 'Game Scripting',
    paradigms: ['Scripting', 'Prototype-based', 'Imperative'],
    level: 'Specialist',
    xp: 7500,
    color: '#000080',
    description: 'The embedded game scripting language. Used in Roblox, WoW, LÖVE2D, and game modding everywhere.',
    useCases: ['Roblox (Lua 5.1)', 'WoW addons', 'LÖVE2D games', 'Game modding', 'Embedded scripting', 'Redis scripting'],
    strengths: ['Extremely lightweight (~200KB)', 'Fast embedding', 'Simple syntax', 'Metatables for OOP', 'Coroutines'],
    weaknesses: ['1-indexed arrays', 'No standard library', 'Limited error handling', 'Weak type system'],
    snippet: `-- Lua -- metatables, coroutines, game systems
-- Object system via metatables
local Class = {}
Class.__index = Class

function Class:new(o)
    o = o or {}
    setmetatable(o, self)
    self.__index = self
    return o
end

-- Entity base class
local Entity = Class:new({
    x = 0, y = 0,
    health = 100,
    active = true
})

function Entity:update(dt)
    -- Override in subclasses
end

function Entity:takeDamage(amount)
    self.health = math.max(0, self.health - amount)
    if self.health <= 0 then
        self:onDeath()
    end
end

-- Player inherits from Entity
local Player = Entity:new({
    speed = 200,
    score = 0,
    combo = 0
})

function Player:update(dt)
    local dx, dy = 0, 0
    if love.keyboard.isDown('a') then dx = -1 end
    if love.keyboard.isDown('d') then dx = 1 end
    
    self.x = self.x + dx * self.speed * dt
    self.y = self.y + dy * self.speed * dt
end

-- Coroutine for cutscenes
local cutscene = coroutine.create(function()
    showText("The portal opens...")
    coroutine.yield(2.0)  -- wait 2 seconds
    showText("Enter the dungeon?")
    coroutine.yield(1.5)
    openDoor()
    coroutine.yield(1.0)
end)

-- Event system
local EventBus = {}
EventBus._listeners = {}

function EventBus:on(event, callback)
    self._listeners[event] = self._listeners[event] or {}
    table.insert(self._listeners[event], callback)
end

function EventBus:emit(event, ...)
    for _, cb in ipairs(self._listeners[event] or {}) do
        cb(...)
    end
end`,
    concepts: ['Metatables', 'Coroutines', 'Closures', 'Tables as everything', 'Weak references', 'pcall/xpcall', 'String patterns', 'Modules', 'Environments', 'Userdata'],
  },
  {
    id: 'wasm',
    name: 'WebAssembly',
    emoji: '⚡',
    category: 'Web/Systems',
    paradigms: ['Binary', 'Stack-based VM', 'Low-level'],
    level: 'Specialist',
    xp: 7200,
    color: '#654FF0',
    description: 'Near-native speed in the browser. Compile C++/Rust/Go to run at 1.5x native speed on the web.',
    useCases: ['Browser game engines', 'Video/audio processing', 'Cryptography in browser', 'Porting native apps to web', 'Figma, AutoCAD web'],
    strengths: ['Near-native performance', 'Language agnostic', 'Sandboxed security', 'Streaming compilation', 'WASI for server'],
    weaknesses: ['No direct DOM access', 'Large binary size', 'Debugging complexity', 'Memory management'],
    snippet: `;; WebAssembly Text Format (WAT) — game physics
(module
  ;; Import JS memory
  (import "env" "memory" (memory 1))
  
  ;; Entity structure: x(f32), y(f32), vx(f32), vy(f32) = 16 bytes each
  (func $update_entities (export "update_entities")
    (param $ptr i32)    ;; pointer to entity array
    (param $count i32)  ;; number of entities
    (param $dt f32)     ;; delta time
    (param $gravity f32)
    (local $i i32)
    (local $offset i32)
    (local $x f32) (local $y f32)
    (local $vx f32) (local $vy f32)
    
    (local.set $i (i32.const 0))
    (block $break
      (loop $loop
        (br_if $break (i32.ge_u (local.get $i) (local.get $count)))
        
        ;; Calculate byte offset (16 bytes per entity)
        (local.set $offset (i32.mul (local.get $i) (i32.const 16)))
        
        ;; Load entity data
        (local.set $x  (f32.load (local.get $offset)))
        (local.set $y  (f32.load (i32.add (local.get $offset) (i32.const 4))))
        (local.set $vx (f32.load (i32.add (local.get $offset) (i32.const 8))))
        (local.set $vy (f32.load (i32.add (local.get $offset) (i32.const 12))))
        
        ;; Apply gravity to vy
        (local.set $vy 
          (f32.add (local.get $vy) 
            (f32.mul (local.get $gravity) (local.get $dt))))
        
        ;; Update position
        (local.set $x (f32.add (local.get $x) (f32.mul (local.get $vx) (local.get $dt))))
        (local.set $y (f32.add (local.get $y) (f32.mul (local.get $vy) (local.get $dt))))
        
        ;; Store back
        (f32.store (local.get $offset) (local.get $x))
        (f32.store (i32.add (local.get $offset) (i32.const 4)) (local.get $y))
        (f32.store (i32.add (local.get $offset) (i32.const 8)) (local.get $vx))
        (f32.store (i32.add (local.get $offset) (i32.const 12)) (local.get $vy))
        
        (local.set $i (i32.add (local.get $i) (i32.const 1)))
        (br $loop)
      )
    )
  )
)`,
    concepts: ['Linear Memory', 'Stack Machine', 'WAT Text Format', 'WASI', 'Emscripten', 'wasm-bindgen', 'Memory Management', 'SIMD', 'Threads', 'Component Model'],
  },
];

export const DESIGN_PATTERNS = [
  { name: 'Entity-Component-System', category: 'Game', description: 'Decouple data (Components) from logic (Systems) from identity (Entities). Used in Unity, Bevy, Overwatch.' },
  { name: 'Observer / Event Bus', category: 'Universal', description: 'Decouple emitters from listeners. Components fire events; others react. Zero coupling.' },
  { name: 'State Machine', category: 'Game/UI', description: 'Explicit states with defined transitions. Player can be Idle→Running→Jumping→Falling→Dead.' },
  { name: 'Command Pattern', category: 'Game/Universal', description: 'Encapsulate actions as objects. Enables undo/redo, replay systems, networked sync.' },
  { name: 'Object Pool', category: 'Performance', description: 'Pre-allocate objects to avoid GC pauses. Critical for bullets, particles, enemies.' },
  { name: 'Spatial Hashing', category: 'Game', description: 'O(1) collision queries by bucketing entities into grid cells. Scales to millions of objects.' },
  { name: 'Repository Pattern', category: 'Backend', description: 'Abstract data access behind a consistent interface. Swap databases without changing business logic.' },
  { name: 'CQRS', category: 'Backend', description: 'Separate read models from write models. Scale reads independently from writes.' },
  { name: 'Behavioral Trees', category: 'AI/Game', description: 'Hierarchical AI decision system. Used in every major game for NPC behavior.' },
  { name: 'Data-Oriented Design', category: 'Performance', description: 'Organize data for CPU cache efficiency. Process arrays of structs as structs of arrays.' },
];

export const CATEGORIES = ['All', 'Web', 'AI/Systems', 'Systems', 'Game/Enterprise', 'Backend', 'Enterprise', 'Mobile', 'Graphics', 'Data', 'Game Scripting', 'Web/Systems'];