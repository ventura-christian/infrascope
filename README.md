# InfraScope

## Overview
InfraScope is a single-page web dashboard that simulates real-time infrastructure monitoring. It displays system status metrics, a simulated event feed, a storage layer for user notes, and a visual media stream through a carousel interface.

The application is built using vanilla JavaScript with modular structure and focuses on state-driven UI updates, simulated system behavior, and DOM-based rendering.

Webpage link --  [live demo](https://ventura-christian.github.io/infrascope/)

## Features

### System Dashboard
- Displays simulated infrastructure nodes
- Each system includes:
  - status (online, degraded, offline)
  - latency metrics
- Status updates are randomly simulated at intervals

### Event Feed
- Logs system activity and user interactions
- Displays real-time simulated system events
- Includes a media carousel for visual event representation

### Storage Layer
- Allows users to save notes locally
- Uses browser localStorage for persistence
- Renders saved entries dynamically

### Mode System
- Supports multiple UI modes:
  - idle
  - dashboard
  - storage
  - feed
- Mode changes update:
  - body data attributes
  - UI label state
  - event system via CustomEvent

### Carousel (Feed View)
- Uses Slick Carousel library
- Displays rotating media content
- Initialized when feed mode becomes active


## Technology Stack
- HTML5
- CSS3 (custom variables, layout system, animations)
- Vanilla JavaScript (ES Modules)
- jQuery (required for Slick Carousel)
- Slick Carousel (media slider)

## Architecture

### Core Modules
- `app.js`: application state, lifecycle, and system logic
- `ui.js`: DOM rendering and UI behavior
- `api.js`: simulated system data retrieval
- `storage.js`: localStorage persistence layer

### State Flow
- Central state object manages systems, feed, and session data
- Events are used to broadcast mode changes
- UI updates are triggered through render functions

### Event System
- Custom `modeChange` event drives UI transitions
- User interactions update session tracking metrics
- System simulation runs on timed intervals



## Behavior Model
- System metrics update on intervals to simulate real infrastructure behavior
- UI modes control visible views and active components
- Feed logs both system and user-driven events
- Carousel initializes only when feed mode is active



## Known Design Constraints
- Carousel must initialize only when visible
- UI components depend on correct mode synchronization
- System rendering depends on proper API data hydration
- DOM updates are event-driven, not declarative


## Purpose
This project is designed as a learning environment for:
- frontend state management without frameworks
- DOM manipulation patterns
- simulated backend behavior in the browser
- modular JavaScript architecture
- event-driven UI systems



## Development Notes
- Ensure system data is loaded before rendering dashboards
- Avoid initializing UI components while their container is hidden
- Maintain a single source of truth for mode changes
- Keep UI modules separated from application lifecycle logic


## Future Improvements
- Centralized state manager for mode handling
- Component lifecycle system (mount/unmount)
- Replace jQuery dependency with native implementation
- Improve data simulation realism
- Introduce structured logging system for feed events
