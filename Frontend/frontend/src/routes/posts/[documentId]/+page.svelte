<script>
  import { onMount, tick } from "svelte";
  import { fetchPostById } from "$lib/api";
  import { marked } from "marked";
  import Chart from "chart.js/auto";

  export let data;

  let post = null;
  let isLoading = true;
  let error = null;
  let transactionChartCanvas;

  async function createChart() {
    const months = Object.keys(post?.transactionByMonth);
    // console.log("Months:", months);
    const values = Object.values(post?.transactionByMonth);
    // console.log("Values:", values);

    const ctx = transactionChartCanvas.getContext("2d");
    // console.log("CTX:", ctx);

    new Chart(ctx, {
      type: "line",
      data: {
        labels: months,
        datasets: [
          {
            label: "Transactions Value (in $K)",
            data: values,
            backgroundColor: "cyan",
            borderColor: "black",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  onMount(async () => {
    try {
      // console.log(data);
      post = await fetchPostById(data.id);
      isLoading = false;

      await tick(); // Wait for DOM updates before creating the chart 

      await createChart();
    } catch (err) {
      console.error("Error fetching post:", err);
      error = err.message;
      isLoading = false;
    }
  });

</script>

<svelte:head>
  <title>{post ? post.title : "Loading Post"} | My CSM Application</title>
</svelte:head>

<div class="post-container pt-12">
  {#if isLoading}
    <p>Loading post...</p>
  {:else if error}
    <p class="error">Error: {error}</p>
  {:else if !post}
    <p class="error">Post not found</p>
    <a href="/posts" class="button">Back to Posts</a>
  {:else}
    <div class="post-header">
      <h2 class="text-2xl">{post.title}</h2>
      {#if post.publishedat}
        <div class="text-sm text-gray-500">
          Published: {new Date(post.publishedat).toLocaleDateString()}
        </div>
      {/if}
    </div>

    <!-- {#if post.image?.url}
      <div class="post-image-container">
        <img
          src={`http://localhost:1337${post.image?.url}`}
          alt={post.title}
          class="post-image"
        />
      </div>
    {/if} -->

    <div class="post-content">
      {@html marked(post.content[0].children[0].text || "")}
    </div>

    <!-- Transaction Chart -->
    <canvas bind:this={transactionChartCanvas} width="400" height="200" class="dark:bg-gray-700/50 rounded-md p-2 dark:text-white"
    ></canvas>

    <div class="post-footer">
      <a
        href="/posts"
        class="mx-auto bg-gray-800 dark:border dark:border-neutral-400 text-white px-1.5 py-2 rounded-md"
        >Back to Customers</a
      >
    </div>
  {/if}
</div>

<style>
  .error {
    color: red;
  }

  .post-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .post-header {
    margin-bottom: 1.5rem;
  }

  .post-image-container {
    margin-bottom: 2rem;
  }

  .post-image {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 4px;
  }

  .post-content {
    line-height: 1.8;
    margin-bottom: 2rem;
  }

  .post-content :global(h2) {
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .post-content :global(p) {
    margin-bottom: 1rem;
  }

  .post-footer {
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid #eee;
  }
</style>
