<script>
  import { Router, Route } from "svelte-routing";
  import Home from "../pages/home.svelte";
  import About from "../pages/about.svelte";
  import Blog from "../pages/blog.svelte";
  import Todolist from "@/pages/todolist.svelte";

  export let url = "";
</script>

<Router {url}>
  <div>
    <Route path="/" component={Home} />
    <Route path="blog" component={Blog} />
    <Route path="about" component={About} />
    <Route Path="todo" component={Todolist} />
  </div>
</Router>
