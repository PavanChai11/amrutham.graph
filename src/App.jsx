import React, { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, BarChart2 } from 'lucide-react';

const AmruthamRatings = () => {
  // Complete episode list - UPDATE WITH ACTUAL TELUGU NAMES FROM YOUTUBE
  const episodeData = [
    { id: 1, name: "గో గృహ ప్రవేశం (Go Gruha Pravesam)" },
    { id: 2, name: "ఫోను అంటే ఫోను (Phonu Ante Phonu)" },
    { id: 3, name: "బౌ బౌ కంపెనీ (Bow Bow Company)" },
    { id: 4, name: "ఇండా గోవిందా (Inda Govinda)" },
    { id: 5, name: "అటాక్ ఆన్ అంజి (Attack on Anji)" },
    { id: 6, name: "పొట్టి నొప్పి (Potti Noppi)" },
    { id: 7, name: "అంబాజీ (Ambaji)" },
    { id: 8, name: "సెకండ్ హ్యాండ్ కారు (Second Hand Car)" },
    { id: 9, name: "ముగ్గు పోటీ (Muggu Poti)" },
    { id: 10, name: "వాస్తు శాస్త్రం (Vastu Sastram)" },
    // Add episodes 11-84 with actual Telugu names from YouTube
    { id: 11, name: "Episode 11" },
    { id: 12, name: "Episode 12" },
    { id: 13, name: "Episode 13" },
    { id: 14, name: "Episode 14" },
    { id: 15, name: "Episode 15" },
    { id: 16, name: "Episode 16" },
    { id: 17, name: "Episode 17" },
    { id: 18, name: "Episode 18" },
    { id: 19, name: "Episode 19" },
    { id: 20, name: "Episode 20" },
    { id: 21, name: "Episode 21" },
    { id: 22, name: "Episode 22" },
    { id: 23, name: "Episode 23" },
    { id: 24, name: "Episode 24" },
    { id: 25, name: "Episode 25" },
    { id: 26, name: "Episode 26" },
    { id: 27, name: "Episode 27" },
    { id: 28, name: "Episode 28" },
    { id: 29, name: "Episode 29" },
    { id: 30, name: "Episode 30" },
    { id: 31, name: "Episode 31" },
    { id: 32, name: "Episode 32" },
    { id: 33, name: "Episode 33" },
    { id: 34, name: "Episode 34" },
    { id: 35, name: "Episode 35" },
    { id: 36, name: "Episode 36" },
    { id: 37, name: "Episode 37" },
    { id: 38, name: "Episode 38" },
    { id: 39, name: "Episode 39" },
    { id: 40, name: "Episode 40" },
    { id: 41, name: "Episode 41" },
    { id: 42, name: "Episode 42" },
    { id: 43, name: "Episode 43" },
    { id: 44, name: "Episode 44" },
    { id: 45, name: "Episode 45" },
    { id: 46, name: "Episode 46" },
    { id: 47, name: "Episode 47" },
    { id: 48, name: "Episode 48" },
    { id: 49, name: "Episode 49" },
    { id: 50, name: "Episode 50" },
    { id: 51, name: "Episode 51" },
    { id: 52, name: "Episode 52" },
    { id: 53, name: "Episode 53" },
    { id: 54, name: "Episode 54" },
    { id: 55, name: "Episode 55" },
    { id: 56, name: "Episode 56" },
    { id: 57, name: "Episode 57" },
    { id: 58, name: "Episode 58" },
    { id: 59, name: "Episode 59" },
    { id: 60, name: "Episode 60" },
    { id: 61, name: "Episode 61" },
    { id: 62, name: "Episode 62" },
    { id: 63, name: "Episode 63" },
    { id: 64, name: "Episode 64" },
    { id: 65, name: "Episode 65" },
    { id: 66, name: "Episode 66" },
    { id: 67, name: "Episode 67" },
    { id: 68, name: "Episode 68" },
    { id: 69, name: "Episode 69" },
    { id: 70, name: "Episode 70" },
    { id: 71, name: "Episode 71" },
    { id: 72, name: "Episode 72" },
    { id: 73, name: "Episode 73" },
    { id: 74, name: "Episode 74" },
    { id: 75, name: "Episode 75" },
    { id: 76, name: "Episode 76" },
    { id: 77, name: "Episode 77" },
    { id: 78, name: "Episode 78" },
    { id: 79, name: "Episode 79" },
    { id: 80, name: "Episode 80" },
    { id: 81, name: "Episode 81" },
    { id: 82, name: "Episode 82" },
    { id: 83, name: "Episode 83" },
    { id: 84, name: "Episode 84" }
  ];

  const [episodes, setEpisodes] = useState([]);
  const [userVotes, setUserVotes] = useState({});
  const [hoverRating, setHoverRating] = useState({});
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('episode');

  useEffect(() => {
    initializeData();
  }, []);

  const initializeData = async () => {
    try {
      const storedEpisodes = await window.storage.get('amrutham-episodes-v2');
      const storedVotes = await window.storage.get('amrutham-user-votes-v2');
      
      if (storedEpisodes && storedEpisodes.value) {
        setEpisodes(JSON.parse(storedEpisodes.value));
      } else {
        const initialEpisodes = episodeData.map(ep => ({
          ...ep,
          totalRating: 0,
          voteCount: 0,
          averageRating: 0
        }));
        setEpisodes(initialEpisodes);
        await window.storage.set('amrutham-episodes-v2', JSON.stringify(initialEpisodes));
      }

      if (storedVotes && storedVotes.value) {
        setUserVotes(JSON.parse(storedVotes.value));
      }
    } catch (error) {
      const initialEpisodes = episodeData.map(ep => ({
        ...ep,
        totalRating: 0,
        voteCount: 0,
        averageRating: 0
      }));
      setEpisodes(initialEpisodes);
    }
    setLoading(false);
  };

  const handleRating = async (episodeId, rating) => {
    if (userVotes[episodeId]) {
      alert('మీరు ఇప్పటికే ఈ ఎపిసోడ్‌కు రేటింగ్ ఇచ్చారు! (You have already rated this episode!)');
      return;
    }

    const updatedEpisodes = episodes.map(ep => {
      if (ep.id === episodeId) {
        const newTotal = ep.totalRating + rating;
        const newCount = ep.voteCount + 1;
        return {
          ...ep,
          totalRating: newTotal,
          voteCount: newCount,
          averageRating: parseFloat((newTotal / newCount).toFixed(1))
        };
      }
      return ep;
    });

    const newUserVotes = { ...userVotes, [episodeId]: rating };
    
    setEpisodes(updatedEpisodes);
    setUserVotes(newUserVotes);

    try {
      await window.storage.set('amrutham-episodes-v2', JSON.stringify(updatedEpisodes));
      await window.storage.set('amrutham-user-votes-v2', JSON.stringify(newUserVotes));
    } catch (error) {
      console.error('Storage error:', error);
    }
  };

  const getRatingColor = (rating) => {
    if (rating >= 8.5) return '#4ade80';
    if (rating >= 7) return '#a3e635';
    if (rating >= 5.5) return '#facc15';
    if (rating >= 4) return '#fb923c';
    return '#f87171';
  };

  const getSortedEpisodes = () => {
    const sorted = [...episodes];
    if (sortBy === 'rating') {
      return sorted.sort((a, b) => {
        if (a.voteCount === 0 && b.voteCount === 0) return a.id - b.id;
        if (a.voteCount === 0) return 1;
        if (b.voteCount === 0) return -1;
        return b.averageRating - a.averageRating;
      });
    }
    return sorted.sort((a, b) => a.id - b.id);
  };

  const calculateStats = () => {
    const ratedEpisodes = episodes.filter(ep => ep.voteCount > 0);
    const totalVotes = episodes.reduce((sum, ep) => sum + ep.voteCount, 0);
    const totalRating = episodes.reduce((sum, ep) => sum + ep.totalRating, 0);
    const avgRating = totalVotes > 0 ? (totalRating / totalVotes).toFixed(1) : '0.0';
    return { totalVotes, avgRating, ratedEpisodes: ratedEpisodes.length };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-2xl font-bold text-blue-600">Loading అమృతం...</div>
      </div>
    );
  }

  const stats = calculateStats();
  const sortedEpisodes = getSortedEpisodes();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white shadow-xl">
        <div className="max-w-5xl mx-auto px-4 py-10">
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold mb-3" style={{ fontFamily: 'system-ui' }}>
              అమృతం
            </h1>
            <h2 className="text-2xl font-semibold mb-2">AMRUTHAM</h2>
            <p className="text-blue-100 text-lg mb-3">HD Remastered Episodes - Rate & Review</p>
            <a 
              href="https://www.youtube.com/@AmruthamSerial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full font-semibold transition-colors"
            >
              ▶ Watch on YouTube
            </a>
          </div>

          <div className="grid grid-cols-3 gap-4 mt-8 max-w-2xl mx-auto">
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{stats.totalVotes}</div>
              <div className="text-sm text-blue-100">Total Votes</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <TrendingUp className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{stats.avgRating}</div>
              <div className="text-sm text-blue-100">Avg Rating</div>
            </div>
            <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
              <BarChart2 className="w-8 h-8 mx-auto mb-2" />
              <div className="text-3xl font-bold">{stats.ratedEpisodes}/84</div>
              <div className="text-sm text-blue-100">Rated Episodes</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Options */}
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="bg-white rounded-lg shadow-md p-4 flex items-center justify-between">
          <div className="text-gray-700 font-semibold">Sort by:</div>
          <div className="flex gap-3">
            <button
              onClick={() => setSortBy('episode')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'episode'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Episode Number
            </button>
            <button
              onClick={() => setSortBy('rating')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === 'rating'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Highest Rated
            </button>
          </div>
        </div>
      </div>

      {/* Episodes List */}
      <div className="max-w-5xl mx-auto px-4 pb-12">
        <div className="space-y-3">
          {sortedEpisodes.map((episode) => (
            <div
              key={episode.id}
              className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5"
            >
              <div className="flex items-center justify-between gap-4 flex-wrap">
                {/* Episode Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-sm font-bold flex-shrink-0">
                      EP {episode.id}
                    </span>
                    <h3 className="text-lg font-semibold text-gray-800" style={{ fontFamily: 'system-ui' }}>
                      {episode.name}
                    </h3>
                  </div>
                  
                  {/* Rating Display */}
                  {episode.voteCount > 0 && (
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center gap-3">
                        <div 
                          className="h-3 w-20 rounded-full"
                          style={{ backgroundColor: getRatingColor(episode.averageRating) }}
                        />
                        <span 
                          className="text-3xl font-bold"
                          style={{ color: getRatingColor(episode.averageRating) }}
                        >
                          {episode.averageRating.toFixed(1)}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({episode.voteCount} {episode.voteCount === 1 ? 'vote' : 'votes'})
                      </span>
                    </div>
                  )}

                  {episode.voteCount === 0 && (
                    <div className="text-sm text-gray-500">No ratings yet - Be the first to rate!</div>
                  )}
                </div>

                {/* Rating Buttons */}
                <div className="flex flex-col items-end gap-2">
                  {userVotes[episode.id] ? (
                    <div className="bg-green-100 text-green-700 px-5 py-2.5 rounded-lg font-semibold">
                      ✓ You rated: {userVotes[episode.id]}/10
                    </div>
                  ) : (
                    <>
                      <div className="text-sm text-gray-600 font-medium mb-1">Rate this episode:</div>
                      <div className="flex gap-1.5 flex-wrap justify-end">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => handleRating(episode.id, rating)}
                            onMouseEnter={() => setHoverRating({ ...hoverRating, [episode.id]: rating })}
                            onMouseLeave={() => setHoverRating({ ...hoverRating, [episode.id]: 0 })}
                            className={`w-11 h-11 rounded-lg font-bold text-sm transition-all ${
                              (hoverRating[episode.id] || 0) >= rating
                                ? 'bg-blue-600 text-white scale-110 shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-blue-400 hover:text-white'
                            }`}
                          >
                            {rating}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-gray-400 mb-2">
            Fan-made rating website for అమృతం (Amrutham) Serial
          </p>
          <p className="text-sm text-gray-500">
            Watch 2 new remastered episodes daily on YouTube • Original series: 2001-2007 (313 episodes)
          </p>
        </div>
      </div>
    </div>
  );
};

export default AmruthamRatings;
